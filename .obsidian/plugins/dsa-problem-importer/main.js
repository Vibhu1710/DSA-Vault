const { Plugin, Notice, Modal } = require('obsidian');
const path = require('path');
const http = require('http');


async function getChromeWSEndpoint({
  hosts = ['127.0.0.1', 'localhost'],
  ports = [9222],
  timeoutMs = 800
} = {}) {
  const tryFetch = (host, port) =>
    new Promise((resolve, reject) => {
      const req = http.get(
        { host, port, path: '/json/version', timeout: timeoutMs },
        (res) => {
          if (res.statusCode !== 200) {
            res.resume(); // drain
            return reject(new Error(`HTTP ${res.statusCode} from ${host}:${port}`));
          }
          let buf = '';
          res.setEncoding('utf8');
          res.on('data', (d) => (buf += d));
          res.on('end', () => {
            try {
              const json = JSON.parse(buf);
              if (!json.webSocketDebuggerUrl) {
                return reject(new Error(`No webSocketDebuggerUrl on ${host}:${port}`));
              }
              resolve(json.webSocketDebuggerUrl);
            } catch (e) {
              reject(new Error(`Invalid JSON from ${host}:${port}: ${e.message}`));
            }
          });
        }
      );
      req.on('timeout', () => {
        req.destroy(new Error(`Timeout ${host}:${port}`));
      });
      req.on('error', reject);
    });

  // Try all combinations until one works
  for (const port of ports) {
    for (const host of hosts) {
      try {
        return await tryFetch(host, port);
      } catch (_) {
        // keep trying
      }
    }
  }
  throw new Error(
    `Could not reach Chrome DevTools at ${hosts.join(',')} on ports ${ports.join(',')}.
Make sure Chrome is running with --remote-debugging-port=9222 and your debug profile.`
  );
}


// NOTE: Puppeteer and html-to-md must be installed in this plugin folder.
// We'll require them lazily to allow Obsidian to load even if not installed.
module.exports = class DsaProblemImporterPlugin extends Plugin {

  async scrapeProblem(url) {
      const pluginDir = this.app.vault.adapter.basePath + '/.obsidian/plugins/dsa-problem-importer';
      let puppeteer, html2md;
      try {
          puppeteer = require(path.join(pluginDir, 'node_modules', 'puppeteer-core'));
          html2md = require(path.join(pluginDir, 'node_modules', 'html-to-md'));
      } catch (e) {
          console.error(e);
          throw new Error('Missing dependencies. Run: npm install puppeteer html-to-md axios');
      }

      let platform = "";
      let result = { title: 'Untitled Problem', markdown: "" };
      if (!url) return {...result, platform};

      // if valid URL, extract domain
      const domain = new URL(url).hostname;

      const { scrapeLeetCode } = require(path.join(pluginDir, 'leetcodeScraper.js'));
      const { scrapeCodeChef } = require(path.join(pluginDir, 'codechefScraper.js'));
      const { scrapeCodeForces } = require(path.join(pluginDir, 'codeforcesScraper.js'));
      const { scrapeCodingNinjas } = require(path.join(pluginDir, 'codingNinjasScraper.js'));

      const browserWSEndpoint = await getChromeWSEndpoint({
        hosts: ['127.0.0.1', 'localhost'],
        ports: [9222] // add more ports if you sometimes change it
      });

      const browser = await puppeteer.connect({
        browserWSEndpoint,
        defaultViewport: null,
      });
      const page = await browser.newPage();

      try {
        if (domain.includes('leetcode.com')) {
            platform = 'LeetCode';
            result = await scrapeLeetCode(url, page, html2md);
        } 
        else if (domain.includes('codechef.com')) {
            platform = 'CodeChef';
            result = await scrapeCodeChef(url, page, html2md);
        }
        else if (domain.includes('codeforces.com')) {
          platform = 'CodeForces';
          result = await scrapeCodeForces(url, page, html2md);
      }
        else if (domain.includes('classroom.codingninjas.com')){
          platform = 'CodingNinjas';
          result = await scrapeCodingNinjas(url, page, html2md);
        }
      } catch(e) {
        console.log(e);
      }

      // close the opened page
      await page.close();

      return {...result, platform};
  }

  async onload() {
    this.addCommand({
      id: 'import-problem-web-scrape',
      name: 'Import Problem (web scrape)',
      callback: async () => {
        try {
          const url = await this.promptForUrl();

          // Run the scraper and create file
          const { title, markdown, platform } = await this.scrapeProblem(url);

          // Sanitize filename
          const filename = this.sanitizeFilename(title) + '.md';

          // Ensure unique filename if exists
          let filePath = filename;
          let counter = 1;
          while (this.app.vault.getAbstractFileByPath(filePath)) {
            filePath = `${this.sanitizeFilename(title)} (${counter}).md`;
            counter++;
          }

          const contents = `${this.getTemplatePreText(url, platform)}\n${markdown}\n`;
          await this.app.vault.create(filePath, contents);
          new Notice(`Created note: ${filePath}`);
          // Open the file
          const file = this.app.vault.getAbstractFileByPath(filePath);
          if (file) {
            this.app.workspace.activeLeaf.openFile(file);
          }
        } catch (err) {
          console.error(err);
          new Notice(`Error: ${err && err.message ? err.message : err}`);
        }
      }
    });
  }

  onunload() {
    // cleanup if needed
  }

  getTemplatePreText(url, platform) {
    const created = window.moment().format("ddd, DD MMM");
    return `---
solution_file: 
tags: []
type: 
solved: false
platform: ${platform}
date_created: ${created}
---

##### Question Source  
[Link](${url})

---

##### Solved Example  
\`\`\`dataviewjs
const linkPrefix = "vscode://file/Users/vibhubhanot/Documents/DSA/";
let path = dv.current().file.path;
let meta = app.metadataCache.getCache(path);
const frontmatter = meta.frontmatter;

if (frontmatter?.solution_file) {
    // File path already exists → show link
    dv.el("a", "Link", { href: linkPrefix + frontmatter?.solution_file });
} else {
    // No file path yet → show Add button
    const btn = dv.el("button", "Add solution file");

    btn.onclick = async () => {
        const qa = app.plugins.plugins.quickadd.api;
        const filePath = await qa.inputPrompt("Enter relative file path:");

        if (filePath) {
            // --- Update YAML frontmatter ---
            const file = app.vault.getAbstractFileByPath(dv.current().file.path);
            await app.fileManager.processFrontMatter(file, fm => {
                fm.solution_file = filePath;
                fm.solved = true;
            });

            // Replace button with link
            btn.remove();
            dv.el("a", "Link", { href: linkPrefix + filePath });
        }
    };
}
\`\`\`

---

`;
  }

  async promptForUrl() {
    return new Promise((resolve) => {
      new UrlModal(this.app, resolve).open();
    });
  }

  sanitizeFilename(name) {
    let cleaned = name.replace(/[\\/:*?"<>|]/g, '').trim();
    if (cleaned.length > 120) cleaned = cleaned.slice(0, 120).trim();
    return cleaned || 'Problem';
  }
};

// Simple modal for URL input
class UrlModal extends Modal {
  constructor(app, onSubmit) {
    super(app);
    this.onSubmit = onSubmit;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.createEl('h2', { text: 'Enter problem URL' });

    const input = contentEl.createEl('input', { type: 'text' });
    input.style.width = '100%';
    input.placeholder = 'Paste problem URL here...';
    input.focus();

    const controls = contentEl.createEl('div', { cls: 'modal-button-container' });
    const ok = controls.createEl('button', { text: 'OK' });
    ok.addEventListener('click', () => {
      this.close();
      this.onSubmit(input.value.trim());
    });

    const cancel = controls.createEl('button', { text: 'Cancel' });
    cancel.addEventListener('click', () => {
      this.close();
      this.onSubmit(null);
    });

    // Submit on enter
    input.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter') {
        ev.preventDefault();
        ok.click();
      }
    });
  }

  onClose() {
    this.contentEl.empty();
  }
}
