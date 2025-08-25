// codeforcesScraper.js
async function scrapeCodeForces(url, page, html2md) {
    // 1) Navigate
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    // 2) Candidate selectors (primary is .problem-statement)
    const CANDIDATE_SELECTORS = [
        '.problem-statement',
        'div.problem-statement',
        '#problem-statement',
        '.problem-view',
        'div[class*="problem"]'
    ];

    // 3) Wait for statement container
    let statementSelector = null;
    try {
        await page.waitForFunction(
            (cands) => cands.some(s => !!document.querySelector(s)),
            { timeout: 25000 },
            CANDIDATE_SELECTORS
        );
        statementSelector = await page.evaluate((cands) => {
            for (const s of cands) {
                if (document.querySelector(s)) return s;
            }
            return null;
        }, CANDIDATE_SELECTORS);
    } catch (_) {}

    // 4) Extract title (same logic as yours)
    let title = 'Untitled Problem';
    try {
        title = await page.evaluate((sel) => {
            const tryText = (el) => (el && el.innerText && el.innerText.trim()) || null;
            if (sel) {
                const root = document.querySelector(sel);
                if (root) {
                    const headerTitle = root.querySelector('.header .title');
                    if (tryText(headerTitle)) return tryText(headerTitle);
                    const anyH = root.querySelector('h1, h2, h3');
                    if (tryText(anyH)) return tryText(anyH);
                }
            }
            const globalHeading = document.querySelector('h1, h2, h3');
            if (tryText(globalHeading)) return tryText(globalHeading);
            const og = document.querySelector('meta[property="og:title"], meta[name="twitter:title"]');
            if (og && og.content) return og.content.trim();
            return (document.title || 'Untitled Problem').replace(/\s*\|\s*Codeforces.*/i, '').trim();
        }, statementSelector);
    } catch (_) {}

    // 5) Extract HTML, but:
    //    - remove <nobr>…</nobr>
    //    - protect <math>…</math> with placeholders
    //    - protect <div class="input">…</div> with placeholders
    let html = '';
    let preservedInputs = [];
    let preservedMath = [];
    try {
        if (statementSelector) {
            const payload = await page.evaluate((sel) => {
                const root = document.querySelector(sel);
                if (!root) return { html: '', inputs: [], maths: [] };

                const clone = root.cloneNode(true);

                // Remove header (title/limits) to avoid duplication
                const header = clone.querySelector('.header');
                if (header) header.remove();

                // Remove all <nobr> elements (tag + content)
                clone.querySelectorAll('nobr').forEach(n => n.remove());

                // Protect MathML so html2md won't touch it
                const maths = [];
                clone.querySelectorAll('math').forEach((el, idx) => {
                    const token = `__CF_MATH_${idx}__`;
                    maths.push({ token, html: el.outerHTML });
                    const placeholder = document.createTextNode(token);
                    el.parentNode.replaceChild(placeholder, el);
                });

                // Protect <div class="input"> blocks (exact original HTML)
                const inputs = [];
                clone.querySelectorAll('div.input').forEach((el, idx) => {
                    const token = `__CF_INPUT_${idx}__`;
                    inputs.push({ token, html: el.outerHTML });
                    const placeholder = document.createTextNode(token);
                    el.parentNode.replaceChild(placeholder, el);
                });

                // (Optional tiny cleanup)
                clone.querySelectorAll('a[href^="#"]').forEach(a => {
                    if (!a.innerText || a.innerText.trim().length <= 1) a.remove();
                });

                return { html: clone.outerHTML, inputs, maths };
            }, statementSelector);

            html = payload.html || '';
            preservedInputs = payload.inputs || [];
            preservedMath = payload.maths || [];
        } else {
            try {
                html = await page.$eval('main', el => el.innerHTML);
            } catch (e) {
                html = await page.content();
            }
        }
    } catch (_) {
        html = await page.content();
    }

    // 6) Convert remaining HTML to Markdown
    let markdown = html2md(html || '');

    // 7) Restore MathML verbatim (raw HTML)
    for (const m of preservedMath) {
        markdown = markdown.split(m.token).join(m.html);
    }

    // 8) Restore <div class="input"> blocks as fenced HTML code blocks
    //    (So they render cleanly in Obsidian without being mangled)
    for (const b of preservedInputs) {
        const replacement = `\n\n\`\`\`html\n${b.html}\n\`\`\`\n\n`;
        markdown = markdown.split(b.token).join(replacement);
    }

    // 9) Done
    return { title, markdown };
}

module.exports = { scrapeCodeForces };
