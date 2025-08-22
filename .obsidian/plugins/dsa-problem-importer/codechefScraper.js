async function scrapeCodeChef(url, page, html2md) {
  // 1) Go to the problem page
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

  // 2) Find the problem statement container (old + new UIs)
  //    Your finding (#problem-statement) is prioritized.
  const CANDIDATE_SELECTORS = [
      '#problem-statement',
      'div#problem-statement',
      'section#problem-statement',
      '[id^="problem-statement"]',               // e.g., "problem-statement-english"
      'div[data-cy="problem-statement"]',        // possible React data attributes
      'div[data-testid="problem-statement"]'
  ];

  let statementSelector = null;
  try {
      await page.waitForFunction(
          (cands) => cands.some(s => document.querySelector(s)),
          { timeout: 25000 },
          CANDIDATE_SELECTORS
      );
      statementSelector = await page.evaluate((cands) => {
          for (const s of cands) {
              if (document.querySelector(s)) return s;
          }
          return null;
      }, CANDIDATE_SELECTORS);
  } catch (_) {
      // Fall back later if we didn't find a statement container in time
  }

  // 3) Extract a title
  //    Primary: first <h3> inside the statement container (matches your XPath).
  //    Fallbacks: h1/h2/h3 anywhere, og:title, or document.title cleaned.
  let title = 'Untitled Problem';
  try {
      title = await page.evaluate((sel) => {
          const tryGetText = (el) => (el && el.innerText && el.innerText.trim()) || null;

          if (sel) {
              const root = document.querySelector(sel);
              if (root) {
                  const h3 = root.querySelector('h3');
                  const h1 = root.querySelector('h1');
                  if (tryGetText(h3)) return tryGetText(h3);
                  if (tryGetText(h1)) return tryGetText(h1);
              }
          }

          const anyHeading = document.querySelector('h1, h2, h3');
          if (tryGetText(anyHeading)) return tryGetText(anyHeading);

          const og = document.querySelector('meta[property="og:title"]');
          if (og && og.content && og.content.trim()) return og.content.trim();

          const cleaned = document.title.replace(/\s*\|\s*CodeChef.*/i, '').trim();
          return cleaned || 'Untitled Problem';
      }, statementSelector);
  } catch (_) {
      // stick with default
  }

  // 4) Grab the statement HTML
  //    Prefer the statement container's HTML.
  //    If not found, fall back to <main> or the whole document body.
  let html;
  try {
      if (statementSelector) {
          // Clone node, remove the first H3 (so title isn't duplicated in the body),
          // and return sanitized HTML.
          html = await page.evaluate((sel) => {
              const root = document.querySelector(sel);
              if (!root) return '';
              const clone = root.cloneNode(true);

              // Remove the very first H3 inside the statement block (your title)
              const firstH3 = clone.querySelector('h3');
              if (firstH3) firstH3.remove();

              // Optional small cleanup: remove anchors that are purely navigation (rare)
              clone.querySelectorAll('a[href^="#"]').forEach(a => {
                  if (!a.innerText || a.innerText.trim().length <= 1) a.remove();
              });

              return clone.outerHTML;
          }, statementSelector);
      } else {
          // Fallbacks if the explicit container wasn't found in time
          try {
              html = await page.$eval('main', el => el.innerHTML);
          } catch (_) {
              html = await page.content();
          }
      }
  } catch (_) {
      // Ultimate fallback
      html = await page.content();
  }

  // 5) Convert HTML to Markdown
  let markdown = html2md(html || '');

  // (No starter code section for CodeChef)
  // You can add a horizontal rule to separate header/frontmatter if your pipeline needs it.
  // markdown = `---\n\n${markdown}`;

  return { title, markdown };
}

module.exports = { scrapeCodeChef };