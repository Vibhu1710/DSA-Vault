module.exports = async (params) => {
    const { app } = params;

    const vault = app.vault;
    const rootItems = vault.getRoot().children; // top-level files/folders
    const mdExt = ".md";

    for (let item of rootItems) {
        if (!item.children) continue; // skip root-level files

        const folderName = item.name;
        const qIndexPath = `${folderName}/Q Index${mdExt}`;
        const qsFolderPath = `${folderName}/Qs`;

        // Check Q Index.md exists
        const qIndexFile = vault.getAbstractFileByPath(qIndexPath);
        if (!qIndexFile) continue;

        // Check Qs folder exists
        const qsFolder = vault.getAbstractFileByPath(qsFolderPath);
        if (!qsFolder || !qsFolder.children) continue;

        // Filter .md files in Qs
        let qsFiles = qsFolder.children.filter(f => f.extension === "md");
        if (qsFiles.length === 0) continue;

        // Sort by creation date (oldest first)
        qsFiles.sort((a, b) => a.stat.ctime - b.stat.ctime);

        // Create wiki-link list
        const linksList = qsFiles.map(f => `- [[${f.basename}]]`).join("\n");

        // Overwrite Q Index.md
        await vault.modify(qIndexFile, linksList);
    }

    new Notice("✅ All Q Index files updated!");
};