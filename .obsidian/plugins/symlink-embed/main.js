const { Plugin, MarkdownView, Notice, Modal, Setting } = require('obsidian');
const fs = require('fs');
const path = require('path');

class PromptModal extends Modal {
  constructor(app, promptText, onSubmit) {
    super(app);
    this.promptText = promptText;
    this.onSubmit = onSubmit;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();

    contentEl.createEl("h3", { text: this.promptText });

    let inputEl = contentEl.createEl("input", {
      type: "text",
      placeholder: "e.g. priorityQueue/base/customComparator.cpp"
    });

    inputEl.style.width = "100%";

    new Setting(contentEl)
      .addButton(btn =>
        btn.setButtonText("OK").setCta().onClick(() => {
          const value = inputEl.value.trim();
          this.close();
          if (value) this.onSubmit(value);
        })
      )
      .addButton(btn =>
        btn.setButtonText("Cancel").onClick(() => {
          this.close();
        })
      );

    inputEl.focus();
  }

  onClose() {
    this.contentEl.empty();
  }
}

module.exports = class SymlinkEmbedPlugin extends Plugin {
  async onload() {
    this.addCommand({
      id: 'symlink-and-insert-embed',
      name: 'Symlink & Embed Code File',
      callback: () => {
        new PromptModal(this.app, "Relative path inside DSA (e.g. priorityQueue/base/customComparator.cpp):", async (relPath) => {
          await this.createSymlinkAndInsert(relPath);
        }).open();
      }
    });
    console.log('Symlink & Embed Code File plugin loaded');
  }

  onunload() {
    console.log('Symlink & Embed Code File plugin unloaded');
  }

  async createSymlinkAndInsert(relativeInsideDSA) {
    if (!relativeInsideDSA) {
      new Notice("No path provided.");
      return;
    }

    // Define your external DSA root
    const dsaRoot = "/Users/vibhubhanot/Documents/DSA";   // <--- change if needed
    const filePath = path.join(dsaRoot, relativeInsideDSA);

    if (!fs.existsSync(filePath)) {
      new Notice("File not found: " + filePath);
      return;
    }

    // Vault base
    const adapter = this.app.vault.adapter;
    const vaultBase = (typeof adapter.getBasePath === 'function') ? adapter.getBasePath() : adapter.basePath;
    if (!vaultBase) {
      new Notice("Could not resolve vault base path.");
      return;
    }

    // Mirror into Assets/Code
    const mirrorRoot = path.join(vaultBase, "Assets", "Code");
    const targetDir = path.join(mirrorRoot, path.dirname(relativeInsideDSA));
    const linkPath = path.join(mirrorRoot, relativeInsideDSA);

    try {
      fs.mkdirSync(targetDir, { recursive: true });
    } catch (e) {
      new Notice("Failed to create folder structure: " + e.message);
      return;
    }

    if (fs.existsSync(linkPath)) {
      try {
        fs.unlinkSync(linkPath);
      } catch (e) {
        new Notice("Failed to overwrite existing file: " + e.message);
        return;
      }
    }

    try {
      fs.symlinkSync(filePath, linkPath, 'file');
    } catch (e) {
      new Notice("Failed to create symlink: " + e.message);
      return;
    }

    // Embed block
    const embedBlock = this.buildEmbedBlock("Assets/Code", relativeInsideDSA);
    const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (activeView) {
      activeView.editor.replaceSelection(embedBlock);
      new Notice(`Symlink created and embed inserted for ${relativeInsideDSA}`);
    } else {
      new Notice("Symlink created, but no active editor to insert embed.");
    }
  }

  buildEmbedBlock(baseRel, relativeInsideDSA) {
    const vaultPath = `${baseRel}/${relativeInsideDSA}`;
    return [
      "```embed-cpp",
      `PATH: "vault://${vaultPath}"`,
      `TITLE: "${relativeInsideDSA}"`,
      `LINES: "1-200"`,
      "```",
      ""
    ].join("\n");
  }
};
