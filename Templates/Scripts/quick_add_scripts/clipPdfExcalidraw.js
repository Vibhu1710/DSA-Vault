/**
 * QuickAdd script — Bulk-import PDF pages into a new Excalidraw file (fixed)
 * - Uses quickAddApi.suggester + inputPrompt + utility
 * - Uses ExcalidrawAutomate + introspection of EmbeddedFilesLoader
 *
 * Notes:
 * - This variant fixes the "Markdown view is not defined" error by using
 *   a runtime check for the active Markdown editor instead of referencing MarkdownView.
 * - Keep an eye on the developer console if the loader fallback runs (it prints attempted calls).
 */

module.exports = async (params) => {
    const { app, quickAddApi } = params;
    const { suggester, inputPrompt, utility } = quickAddApi;
  
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  
    try {
      // --- init EA (canonical global per Excalidraw plugin) ---
      const ea = ExcalidrawAutomate;
      if (!ea) {
        new Notice("ExcalidrawAutomate not found — ensure Excalidraw plugin is enabled.");
        return;
      }
      // Reset EA state if available (recommended by docs)
      if (typeof ea.reset === "function") ea.reset();
  
      // --- collect PDFs (prefer Assets/ folder if present) ---
      const allPdfs = app.vault.getFiles().filter(f => f.extension?.toLowerCase() === 'pdf');
      if (!allPdfs.length) {
        new Notice("No PDF files found in vault.");
        return;
      }
      const assets = allPdfs.filter(f => f.path.toLowerCase().includes('/assets/'));
      const pool = assets.length ? assets : allPdfs;
  
      // --- QuickAdd suggester: show a dropdown of PDF paths ---
      // Use an array of display strings and the parallel array of TFile values.
      const display = pool.map(f => f.path);
      const picked = await suggester(display, pool, "Select PDF to import");
      if (!picked) { new Notice("PDF selection cancelled."); return; }
  
      // Normalize picked result into a TFile (QuickAdd may return the value or a string)
      let pdfTFile;
      if (typeof picked === "string") {
        pdfTFile = app.vault.getAbstractFileByPath(picked);
      } else if (picked?.path) {
        pdfTFile = picked;
      } else {
        // fallback: try to find by matching the display string
        const idx = display.indexOf(picked);
        pdfTFile = idx >= 0 ? pool[idx] : null;
      }
      if (!pdfTFile) { new Notice("Couldn't resolve selected PDF file."); return; }
  
      // --- Ask user for page-range (can be blank to skip per-page import) ---
      const pageRangeInput = await inputPrompt("Pages to import (e.g. 3 or 2-5 or 1,3-5). Leave blank to skip page-image import.", "1");
      if (pageRangeInput === null) { new Notice("Cancelled."); return; }
      const safeRange = (pageRangeInput || "").trim();
  
      // --- Build filename and ensure target folder exists ---
      const basePdfName = pdfTFile.basename.replace(/\.pdf$/i, '');
      const baseName = safeRange
        ? (safeRange.includes(',') || safeRange.includes('-') ? `${basePdfName} ${safeRange}` : `${basePdfName} p${safeRange}`)
        : basePdfName;
  
      const targetFolder = "Excalidraw"; // change if you want another folder
      try { if (!app.vault.getAbstractFileByPath(targetFolder)) await app.vault.createFolder(targetFolder); } catch(e){}
  
      // Dedupe filename by appending (1), (2), ...
      let finalBase = baseName;
      let counter = 1;
      while (await app.vault.getAbstractFileByPath(`${targetFolder}/${finalBase}.excalidraw`)) {
        finalBase = `${baseName} (${counter++})`;
        if (counter > 100) break;
      }
  
      // --- Create new Excalidraw drawing (ea.create opens it) ---
      let createdPath;
      try {
        createdPath = await ea.create({ filename: finalBase, foldername: targetFolder, onNewPane: true });
      } catch (errCreate) {
        console.error("ea.create failed:", errCreate);
        new Notice("Failed to create Excalidraw file. See console.");
        return;
      }
      // Ensure EA targets the newly opened view
      try { ea.setView("active"); } catch (e) { /* best-effort */ }
  
      // --- Try to use the EmbeddedFilesLoader to perform bulk import (the UI's internal loader) ---
      let loader = null;
      try {
        loader = (typeof ea.getEmbeddedFilesLoader === "function") ? ea.getEmbeddedFilesLoader(false) : null;
      } catch (e) {
        loader = null;
      }
  
      const pdfFilePath = pdfTFile.path;
      const triedCalls = [];
      let loaderSuccess = false;
  
      if (loader) {
        // gather loader members and guess likely import method names
        const names = new Set([
          ...Object.getOwnPropertyNames(loader || {}),
          ...Object.getOwnPropertyNames(Object.getPrototypeOf(loader) || {})
        ]);
        const nameList = [...names].filter(Boolean);
        const guessRegex = /pdf|import|insert|addfile|addFiles|loadfile|loadFile|importFile|insertPdf|asPdf|embedded/i;
        const candidates = nameList.filter(n => guessRegex.test(n));
  
        // fallback names historically used or plausible
        const fallbackNames = ["addFiles","addFile","insertFile","importFile","importFiles","insertPdf","insertPdfAsImages","insertPDF","loadFile","loadFiles","addEmbeddedFile","addEmbeddedFiles"];
  
        const namesToTry = [...new Set([...candidates, ...fallbackNames])];
  
        // plausible option shapes that have been used across versions
        const optionVariants = [
          { asPDF: true, pdfPageRange: safeRange },
          { asPDF: true, pageRange: safeRange },
          { pdf: true, pages: safeRange },
          safeRange,
          {}
        ];
  
        const tryCall = async (fn, args) => {
          triedCalls.push({ fn, args });
          try {
            const res = await loader[fn](...args);
            console.log(`loader.${fn} succeeded ->`, res);
            return { ok: true, res };
          } catch (err) {
            console.warn(`loader.${fn} threw`, err);
            return { ok: false, err };
          }
        };
  
        // Attempt plausible fn signatures in sequence
        for (const name of namesToTry) {
          if (!loader[name] || typeof loader[name] !== "function") continue;
          for (const opts of optionVariants) {
            const attempts = [
              [pdfTFile],
              [pdfTFile, opts],
              [pdfFilePath, opts],
              [pdfFilePath]
            ];
            for (const args of attempts) {
              const { ok } = await tryCall(name, args);
              // small delay to let the loader do its thing (timing-dependent)
              await sleep(120);
              if (ok) { loaderSuccess = true; break; }
            }
            if (loaderSuccess) break;
          }
          if (loaderSuccess) break;
        }
  
        // commit/save if loader succeeded
        if (loaderSuccess) {
          try { await ea.addElementsToView?.(false, true); } catch (e) { console.warn("addElementsToView failed", e); }
          try { await ea.save?.(); } catch (e) { console.warn("ea.save failed", e); }
        } else {
          console.log("Tried loader calls:", triedCalls);
        }
      }
  
      // --- Fallback: if loader missing or introspection couldn't perform import, insert embeddable and inform user ---
      if (!loader || !loaderSuccess) {
        const EMBED_W = 700, EMBED_H = 900;
        try {
          const embId = ea.addEmbeddable(50, 50, EMBED_W, EMBED_H, null, pdfTFile);
          await ea.addElementsToView?.(false, true);
        } catch (e) {
          console.warn("Failed to insert embeddable:", e);
        }
  
        const embLink = `![[${targetFolder}/${finalBase}.excalidraw|1200]]\n`;
        // paste embed link to clipboard as fallback
        try {
          if (utility && typeof utility.setClipboard === "function") {
            await utility.setClipboard(embLink);
            new Notice("Could not auto-import pages for this Excalidraw version. Inserted embeddable; link copied to clipboard. Please use the drawing's UI to import pages.");
          } else if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
            await navigator.clipboard.writeText(embLink);
            new Notice("Could not auto-import pages. Inserted embeddable; link copied to clipboard.");
          } else {
            new Notice("Could not auto-import pages. Inserted embeddable; embed link: " + embLink);
          }
        } catch (e) {
          console.warn("Clipboard fallback failed", e);
          new Notice("Could not auto-import pages. Inserted embeddable. See console for details.");
        }
  
        console.log("Loader introspection attempted calls:", triedCalls);
        return;
      }
  
      // --- Success path: insert embed link into active Markdown editor, OR clipboard fallback ---
      const embedLine = `![[${targetFolder}/${finalBase}.excalidraw|1200]]\n`;
  
      // Robust runtime check for an active Markdown editor:
      const activeLeaf = app.workspace.activeLeaf;
      if (activeLeaf && activeLeaf.view && typeof activeLeaf.view.getViewType === "function" && activeLeaf.view.getViewType() === "markdown") {
        // The view is a Markdown view; attempt to replace selection
        try {
          if (activeLeaf.view.editor && typeof activeLeaf.view.editor.replaceSelection === "function") {
            activeLeaf.view.editor.replaceSelection(embedLine);
            new Notice("Imported PDF pages and inserted embed into the active note.");
          } else {
            // Some environments may expose a different editor; fallback to clipboard
            if (utility && typeof utility.setClipboard === "function") {
              await utility.setClipboard(embedLine);
              new Notice("Imported pages. Active editor present but couldn't insert text — link copied to clipboard.");
            } else if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
              await navigator.clipboard.writeText(embedLine);
              new Notice("Imported pages. Active editor present but couldn't insert text — link copied to clipboard.");
            } else {
              new Notice("Imported pages. Could not paste embed — see console for link.");
              console.log("Embed link:", embedLine);
            }
          }
        } catch (e) {
          console.warn("Failed to paste into active editor:", e);
          // fallback to clipboard
          try {
            if (utility && typeof utility.setClipboard === "function") {
              await utility.setClipboard(embedLine);
              new Notice("Imported pages. Link copied to clipboard.");
            } else if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
              await navigator.clipboard.writeText(embedLine);
              new Notice("Imported pages. Link copied to clipboard.");
            } else {
              new Notice("Imported pages, but couldn't paste or copy. See console for the embed link.");
              console.log("Embed link:", embedLine);
            }
          } catch (e2) {
            console.warn("Clipboard fallback also failed", e2);
            new Notice("Imported pages but couldn't paste or copy the embed link. See console.");
          }
        }
      } else {
        // No active markdown editor — copy to clipboard
        try {
          if (utility && typeof utility.setClipboard === "function") {
            await utility.setClipboard(embedLine);
            new Notice("Imported pages. No active note found — embed link copied to clipboard.");
          } else if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
            await navigator.clipboard.writeText(embedLine);
            new Notice("Imported pages. Embed link copied to clipboard.");
          } else {
            new Notice("Imported pages. No active note — embed link: " + embedLine);
          }
        } catch (e) {
          console.warn("Clipboard fallback failed", e);
          new Notice("Imported pages, but couldn't copy link. See console for embed link.");
          console.log("Embed link:", embedLine);
        }
      }
  
      // All done
      return;
    } catch (err) {
      console.error(err);
      new Notice(`Error: ${err?.message || err}`);
      return;
    }
  };
  