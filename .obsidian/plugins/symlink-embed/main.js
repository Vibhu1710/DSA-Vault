import { Plugin, Notice, MarkdownView } from 'obsidian';
import * as path from 'path';
import * as fs from 'fs/promises';

export default class SymlinkEmbedPlugin extends Plugin {

  async onload() {
    this.addCommand({
      id: 'symlink-and-insert-embed',
      name: 'Symlink & Embed Code File',
      callback: async () => {
        await this.createSymlinkAndInsert();
      }
    });
    console.log('Symlink & Embed Code File plugin loaded');
  }

  onunload() {
    console.log('Symlink & Embed Code File plugin unloaded');
  }

  async createSymlinkAndInsert() {
    // 1) Ask for absolute external file path
    const filePath = await this.promptForInput('Absolute path to external file (e.g. /Users/me/.../file.cpp)');
    if (!filePath) {
      new Notice('Cancelled: no file path provided');
      return;
    }

    // Validate file exists
    try {
      await fs.access(filePath);
    } catch (e) {
      new Notice('External file not found: ' + filePath);
      return;
    }

    // 2) get vault absolute path
    // This uses adapter basePath; depending on platform, plugin authors use getBasePath or basePath
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const adapter = this.app.vault.adapter;
    // try adapter.getBasePath() then adapter.basePath
    const vaultBase = (typeof adapter.getBasePath === 'function') ? adapter.getBasePath() : adapter.basePath;
    if (!vaultBase) {
      new Notice('Could not resolve vault base path. Aborting.');
      return;
    }

    // 3) Ensure /Assets folder exists in vault
    const assetsRel = 'Assets';
    const assetsFull = path.join(vaultBase, assetsRel);
    try {
      // Attempt to create folder using vault API if not exists
      const exists = await this.folderExists(assetsFull);
      if (!exists) {
        // we can create folder using the vault API (path relative to vault)
        await this.app.vault.createFolder(assetsRel);
      }
    } catch (e) {
      // fallback: attempt mkdir via fs
      try {
        await fs.mkdir(assetsFull, { recursive: true });
      } catch (err) {
        new Notice('Failed to create Assets folder: ' + String(err));
        return;
      }
    }

    // 4) create symlink inside Assets
    const filename = path.basename(filePath);
    const linkPath = path.join(assetsFull, filename);

    // If link already exists, prompt to overwrite
    let linkAlreadyExists = false;
    try {
      await fs.lstat(linkPath);
      linkAlreadyExists = true;
    } catch (e) {
      linkAlreadyExists = false;
    }

    if (linkAlreadyExists) {
      const overwrite = await this.promptForYesNo(`${linkPath} already exists. Overwrite symlink? (y/n)`);
      if (!overwrite) {
        new Notice('Aborted: symlink exists and not overwritten.');
        return;
      }
      // remove existing link/file
      try {
        await fs.unlink(linkPath);
      } catch (e) {
        new Notice('Failed to remove existing file: ' + String(e));
        return;
      }
    }

    try {
      // create a relative symlink if possible (safer), else absolute
      let targetForLink = filePath;
      // On mac, absolute symlink is fine
      await fs.symlink(targetForLink, linkPath);
    } catch (e) {
      new Notice('Failed to create symlink: ' + String(e));
      return;
    }

    // 5) Insert embed block at current cursor
    const embedBlock = this.buildEmbedBlock(assetsRel, filename);
    const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!activeView) {
      new Notice('No active markdown view to insert embed into. Symlink created.');
      return;
    }

    const editor = activeView.editor;
    editor.replaceSelection(embedBlock);

    new Notice(`Symlink created and embed inserted for ${filename}`);
  }

  buildEmbedBlock(assetsRel, filename) {
    // Insert Embed Code File block (Embed Code File plugin format)
    const vaultPath = `${assetsRel}/${filename}`;
    return [
      '```embed-cpp',
      `PATH: "vault://${vaultPath}"`,
      `TITLE: "${filename}"`,
      `LINES: "1-200"`,
      '```',
      '',
    ].join('\n');
  }

  async promptForInput(promptText) {
    // Simple prompt using browser prompt (works in Obsidian desktop)
    // Alternatively you can build a custom modal using obsidian.Modal
    // Use window.prompt for minimal code
    const answer = window.prompt(promptText);
    if (answer === null) return null;
    const trimmed = answer.trim();
    return trimmed.length ? trimmed : null;
  }

  async promptForYesNo(question) {
    const answer = window.prompt(question + ' (y/n)');
    if (!answer) return false;
    return (answer.trim().toLowerCase()[0] === 'y');
  }

  async folderExists(fullPath) {
    try {
      const stat = await fs.lstat(fullPath);
      return stat.isDirectory();
    } catch (e) {
      return false;
    }
  }
}
