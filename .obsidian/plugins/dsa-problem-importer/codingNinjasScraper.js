async function scrapeCodingNinjas(url, page, html2md) {
    // Navigate to the problem page
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    // Extract problem title
    let title = null;
    try {
        await page.waitForSelector('.problem-title', { timeout: 45000 }); // 45 seconds wait
        title = await page.$eval('.problem-title', el => el.innerText.trim());
    } catch (e) {
        title = 'Untitled Problem';
    }

    // Extract problem description
    const selector = '.problem-description-container';
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
        starterCode = await page.evaluate(async () => {
            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }

            // Retry up to 10 times with 1s delay (total 10s)
            for (let i = 0; i < 10; i++) {
                if (window.monaco && window.monaco.editor) {
                    const models = window.monaco.editor.getModels();
                    if (models.length > 0) {
                        return models[0].getValue();
                    }
                }
                await sleep(1000); // wait 1s before next check
            }
            return '// Monaco editor not ready after 10s';
        });
    } catch (err) {
        starterCode = '// Failed to extract starter code';
    }

    // Convert HTML to markdown
    let markdown = html2md(html || '');

    // Append code snippet as a fenced block
    if (starterCode && starterCode.trim()) {
        markdown += `\n\n---\n\n**Starter Code:**\n\n\`\`\`cpp\n${starterCode}\n\`\`\`\n`;
    }

    return { title, markdown };
}

module.exports = { scrapeCodingNinjas };