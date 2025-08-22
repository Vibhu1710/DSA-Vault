module.exports = async (params) => {
    try {
        const { app, quickAddApi: { inputPrompt } } = params;

        // Ask for folder name
        const folderName = await inputPrompt("Enter folder name");
        if (!folderName) {
            new Notice("❌ No folder name provided.");
            return;
        }

        const rootPath = folderName; // since root-level
        const qsPath = `${rootPath}/Qs`;
        const qIndex = "Q Index";
        const qIndexPath = `${rootPath}/${qIndex}.md`;

        // Create main folder
        await app.vault.createFolder(rootPath);

        // Create Q Index.md
        await app.vault.create(qIndexPath, "");

        // Create Qs subfolder
        await app.vault.createFolder(qsPath);


        const templater = app.plugins.plugins["templater-obsidian"];
        if (templater) {
            // Use Templater API
            const ea = ExcalidrawAutomate;
            ea.reset();
            ea.style.roughness = 0;
            ea.style.fillStyle = "solid";
            ea.style.backgroundColor = "#e7f5ff";
            ea.addEllipse(0, 0, 250, 120);
            ea.addText(12, 50,`[[${folderName}/${qIndex}|Question Bank]]`);
            // Create excalidraw canvas
            await ea.create({
                filename    : `${folderName}`, 
                foldername  : folderName,
                onNewPane   : false
            });
        }

        new Notice(`✅ Created folder "${folderName}"`);
    }
    catch (error) {
        new Notice(`❌ Failed to create base folder structure. ${error?.message}`);
    }
};