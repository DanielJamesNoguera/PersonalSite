const puppeteer = require('puppeteer');

const url = 'https://raider.io/realms/eu';

async function fetchAndParse() {
  // Launch the browser in non-headless mode
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Set a higher timeout and navigate to the URL
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

  // Wait for the cookie consent button and click it
  try {
    await page.waitForSelector('button[mode="primary"]', { timeout: 10000 });
    await page.click('button[mode="primary"]');
    console.log('Accepted cookies');
  } catch (error) {
    console.log('Cookie consent not found, proceeding without clicking');
  }

  // Log more of the HTML content after loading the page
  const htmlContent = await page.content();
  console.log("Page content loaded");
  console.log(htmlContent.slice(0, 5000)); // Log the first 5000 characters of HTML

  // Wait for the table rows to be loaded
  try {
    await page.waitForSelector('.rio-main-content .rio-table .rt-tr-group', { timeout: 60000 });

    // Debug: Log the HTML of the rows
    const rowsHtml = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.rio-main-content .rio-table .rt-tr-group'))
        .map(element => element.outerHTML);
    });
    console.log("Found rows HTML:");
    console.log(rowsHtml);

  } catch (error) {
    console.error('Selector not found, saving page screenshot...');
    await page.screenshot({ path: 'debug_screenshot.png', fullPage: true });
    await browser.close();
    return;
  }

  // Extract the realm data
  const realms = await page.evaluate(() => {
    const rows = document.querySelectorAll('.rio-main-content .rio-table .rt-tr-group');
    const data = [];

    rows.forEach(row => {
      const realmName = row.querySelector('.rio-realm-link')?.innerText.trim();
      const populationText = row.querySelector('.rio-simple-tt .slds-text-align--center .slds-text-color--success')?.parentElement.innerText.trim();
      const playerBaseMatch = populationText.match(/(\d+K?)\s*characters/i);
      const playerBase = playerBaseMatch ? playerBaseMatch[1] : 'Unknown';

      if (realmName) {
        data.push({
          realmName,
          playerBase
        });
      }
    });

    return data;
  });

  console.log(realms);

  // Close the browser
  await browser.close();
}

fetchAndParse().catch(error => {
  console.error('Error fetching data:', error);
});