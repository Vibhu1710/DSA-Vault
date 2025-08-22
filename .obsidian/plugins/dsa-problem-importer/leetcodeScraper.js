async function scrapeLeetCode(url, page, html2md) {
    // Navigate to the problem page
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    // Prefer anchor-based title extraction
    let title = null;
    try {
        const parsed = new URL(url);
        const pathname = parsed.pathname.replace(/\/+$/, '/'); // ensure trailing slash
        const hrefSelector = `a[href="${pathname}"]`;
        title = await page.$eval(hrefSelector, el => el.innerText.trim());
    } catch (e) {
        try {
            title = await page.$eval('h1', el => el.innerText.trim());
        } catch (e2) {
            title = 'Untitled Problem';
        }
    }

    // Try to extract problem description
    const selector = '[data-track-load="description_content"]';
    let html;
    try {
        await page.waitForSelector(selector, { timeout: 20000 });
        html = await page.$eval(selector, el => el.outerHTML);
    } catch (err) {
        try {
            html = await page.$eval('main', el => el.innerHTML);
        } catch (err2) {
            html = await page.content();
        }
    }

    // Extract starter code from Monaco editor (full content via model)
    let starterCode = '';
    try {
        // Wait until Monaco loads (max 15s)
        await page.waitForFunction(
            () => window.monaco && window.monaco.editor && window.monaco.editor.getModels().length > 0,
            { timeout: 15000 }
        );

        starterCode = await page.evaluate(() => {
            const models = window.monaco.editor.getModels();
            if (models.length > 0) {
                return models[0].getValue();
            }
            return '// Monaco has no models yet';
        });
    } catch (err) {
        starterCode = '// Failed to extract starter code';
    }

    // Convert HTML to markdown
    let markdown = html2md(html || '');

    // Append code snippet as a fenced block so Obsidian detects it
    if (starterCode && starterCode.trim()) {
        markdown += `\n\n---\n\n**Starter Code:**\n\n\`\`\`cpp\n${starterCode}\n\`\`\`\n`;
    }

    return { title, markdown };
}

module.exports = { scrapeLeetCode };