/* Auto Folder Tag – robust, folder-aware tagging */
const { Plugin, TFile, Notice } = require('obsidian');

/** Return the level-1 folder name from a path, or null if in root. */
function topLevelFolderFromPath(path) {
  const i = path.indexOf('/');
  return i === -1 ? null : path.slice(0, i);
}

/** Ensure tags is a mutable string-array. */
function normalizeTags(fm) {
  let t = fm.tags;
  if (t == null) return [];
  if (typeof t === 'string') return [t];
  if (Array.isArray(t)) return t.slice();
  return []; // any other unexpected shape
}

module.exports = class AutoFolderTagPlugin extends Plugin {
  async onload() {
    // Fired whenever a file is moved or renamed.
    this.registerEvent(
      this.app.vault.on('rename', async (file, oldPath) => {
        try {
          if (!(file instanceof TFile) || file.extension !== 'md') return;

          const oldTop = topLevelFolderFromPath(oldPath);
          const newTop = topLevelFolderFromPath(file.path);

          // No change (both same folder or both root)
          if (oldTop === newTop) return;

          await this.app.fileManager.processFrontMatter(file, (fm) => {
            let tags = normalizeTags(fm);

            // remove old tag if present
            if (oldTop) {
              const idx = tags.indexOf(oldTop);
              if (idx !== -1) tags.splice(idx, 1);
            }

            // add new tag if needed
            if (newTop && !tags.includes(newTop)) {
              tags.push(newTop);
            }

            fm.tags = tags; // write back
          });
        } catch (err) {
          console.error('[Auto Folder Tag] Error handling rename:', err);
          new Notice('Auto Folder Tag: error – see console (View → Toggle Developer Tools)');
        }
      })
    );

    // Optional: a command to clean/retag the whole vault once.
    this.addCommand({
      id: 'retag-all-by-top-folder',
      name: 'Retag all notes by top-level folder',
      callback: () => this.retagAllByTopFolder()
    });
  }

  /** Optional bulk clean-up: remove any top-level-folder tags that don't match current location; add the correct one. */
  async retagAllByTopFolder() {
    const files = this.app.vault.getMarkdownFiles();

    // Build a set of known top-level folder names from all files’ paths
    const topNames = new Set();
    for (const f of files) {
      const name = topLevelFolderFromPath(f.path);
      if (name) topNames.add(name);
    }

    for (const f of files) {
      const currentTop = topLevelFolderFromPath(f.path);
      await this.app.fileManager.processFrontMatter(f, (fm) => {
        let tags = normalizeTags(fm);

        // Remove any top-level folder tags that don't match the note's current top-level folder
        for (const t of [...tags]) {
          if (topNames.has(t) && t !== currentTop) {
            const i = tags.indexOf(t);
            if (i !== -1) tags.splice(i, 1);
          }
        }

        // Add the current top-level folder tag (if any)
        if (currentTop && !tags.includes(currentTop)) {
          tags.push(currentTop);
        }

        fm.tags = tags;
      });
    }

    new Notice('Auto Folder Tag: retagging complete.');
  }
};
