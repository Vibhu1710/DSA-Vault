async function scrapeCodeChef(url, page, html2md) {
    // const browser = await puppeteer.launch({
    //     headless: false,
    //     executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // adjust for your OS
    //     args: ['--remote-debugging-port=9222', '--user-data-dir=/path/to/DebugProfile']
    // });

    // const page = await browser.newPage();
    // await page.goto('https://www.google.com');

    try {
    
        // Go to a Coding Ninjas problem page (example)
        await page.goto('https://classroom.codingninjas.com/app/classroom/me/13774/content/250061/offering/3394179/problem/1565', {
          waitUntil: 'networkidle2', timeout: 60000
        });
    
        // Step 4: Scrape Title + Description
        // const result = await page.evaluate(() => {
        //   const titleEl = document.querySelector('h1'); // adjust if needed
        //   const descEl = document.querySelector('.description-content'); // adjust if needed
        //   return {
        //     title: titleEl ? titleEl.innerText.trim() : null,
        //     description: descEl ? descEl.innerText.trim() : null,
        //   };
        // });

      } catch (err) {
        console.error("Error:", err);
      }


    return {title: 'Fake Title', markdown: 'Fake Description'}
}

module.exports = { scrapeCodeChef };