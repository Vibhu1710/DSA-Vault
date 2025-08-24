async function scrapeCodeForces(url, page, html2md) {
    // 1) Navigate to the problem page
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    // 2) Candidate selectors (primary is .problem-statement)
    const CANDIDATE_SELECTORS = [
        '.problem-statement',               // canonical Codeforces structure
        'div.problem-statement',
        '#problem-statement',               // defensive: some mirrors/sites
        '.problem-view',                    // defensive
        'div[class*="problem"]'             // very defensive fallback
    ];

    // 3) Wait for any of those selectors to appear (or timeout)
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
    } catch (err) {
        // If nothing was found, we'll fall back later
    }

    // 4) Extract the title
    let title = 'Untitled Problem';
    try {
        title = await page.evaluate((sel) => {
            const tryText = (el) => (el && el.innerText && el.innerText.trim()) || null;

            // Prefer the Codeforces header title inside the statement block
            if (sel) {
                const root = document.querySelector(sel);
                if (root) {
                    const headerTitle = root.querySelector('.header .title');
                    if (tryText(headerTitle)) return tryText(headerTitle);

                    // sometimes the title is in h1/h2/h3 inside the same block
                    const anyH = root.querySelector('h1, h2, h3');
                    if (tryText(anyH)) return tryText(anyH);
                }
            }

            // Fallbacks: global headings or meta tags
            const globalHeading = document.querySelector('h1, h2, h3');
            if (tryText(globalHeading)) return tryText(globalHeading);

            const og = document.querySelector('meta[property="og:title"], meta[name="twitter:title"]');
            if (og && og.content) return og.content.trim();

            // last resort: document.title cleaned
            return (document.title || 'Untitled Problem').replace(/\s*\|\s*Codeforces.*/i, '').trim();
        }, statementSelector);
    } catch (err) {
        // keep default title
    }

    // 5) Extract the statement HTML (remove header so title isn't duplicated)
    let html;
    try {
        if (statementSelector) {
            html = await page.evaluate((sel) => {
                const root = document.querySelector(sel);
                if (!root) return '';

                // clone to avoid mutating the real page
                const clone = root.cloneNode(true);

                // Remove the header (title, limits) to avoid duplicating title in body
                const header = clone.querySelector('.header');
                if (header) header.remove();

                // Cleanup tiny unusable anchors (internal navigation leftover)
                clone.querySelectorAll('a[href^="#"]').forEach(a => {
                    if (!a.innerText || a.innerText.trim().length <= 1) a.remove();
                });

                // Optional: remove empty invisible nodes
                clone.querySelectorAll('*').forEach(n => {
                    if (n.childNodes.length === 0 && !n.innerText) n.remove();
                });

                return clone.outerHTML;
            }, statementSelector);
        } else {
            // Fallback: try main, else whole page content
            try {
                html = await page.$eval('main', el => el.innerHTML);
            } catch (e) {
                html = await page.content();
            }
        }
    } catch (err) {
        // ultimate fallback
        html = await page.content();
    }

    // 6) Convert HTML to Markdown
    let markdown = html2md(html || '');

    // 7) Return result (no starter code for Codeforces)
    return { title, markdown };
}

module.exports = { scrapeCodeForces };