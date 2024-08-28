const puppeteer = require('puppeteer');

async function scrapeHerbPrices(page, herbName) {
    const url = `https://undermine.exchange/#eu-kazzak/search/${encodeURIComponent(herbName)}`;

    try {
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Custom delay function
        const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
        await delay(10000); // Wait for 10 seconds to ensure the page loads completely

        const herbData = await page.evaluate((herbName) => {
            const rows = Array.from(document.querySelectorAll('tr.result'));
            const prices = [];

            rows.forEach(row => {
                const name = row.querySelector('.name span.q2')?.textContent.trim();
                const priceElement = row.querySelector('.price span');
                const quantityElement = row.querySelector('.quantity');

                if (name === herbName && priceElement && quantityElement) {
                    const gold = priceElement.querySelector('.gold')?.textContent.trim() || '0';
                    const silver = priceElement.querySelector('.silver')?.textContent.trim() || '00';
                    const price = parseFloat(`${gold}.${silver}`); // Convert price to float
                    const quantity = parseInt(quantityElement.textContent.trim().replace(/,/g, ''), 10);
                    prices.push({ price, quantity });
                }
            });

            return prices.slice(0, 3); // Return the first 3 results (Rank 1, 2, 3)
        }, herbName);

        return herbData;

    } catch (error) {
        console.error(`Failed to scrape data: ${error.message}`);
        return null; // Return null if there was an error
    }
}

async function getProfitableRefinedHerbs() {
    const herbs = ['Blessing Blossom', 'Mycobloom', 'Orbinid', 'Luredrop', "Arathor's Spear"];
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        for (let herb of herbs) {
            let herbData = await scrapeHerbPrices(page, herb);

            if (herbData && herbData.length === 3) { // Ensure we have 3 ranks of data
                let rank1Price = herbData[0].price;
                let rank2Price = herbData[1].price;
                let rank3Price = herbData[2].price;

                if (rank3Price > 5 * rank2Price) {
                  let profit = rank3Price - (5 * rank2Price);
                  let profitMargin = profit / (5 * rank2Price) * 100;
                  console.log(`Herb: ${herb} Rank 2 -> 3 Profit: ${profit.toFixed(2)}g (${profitMargin.toFixed(1)}%)`);
                }
                else if (rank3Price > 25 * rank1Price) {
                  let profit = rank3Price - (25 * rank1Price);
                  let profitMargin = profit / (25 * rank1Price) * 100;
                  console.log(`Herb: ${herb} Rank 1 -> 3 Profit: ${profit.toFixed(2)}g (${profitMargin.toFixed(1)}%)`);
                }

                if (rank2Price > 5 * rank1Price) {
                  let profit = rank2Price - (5 * rank1Price);
                  let profitMargin = profit / (5 * rank1Price) * 100;
                  console.log(`Herb: ${herb} Rank 1 -> 2 Profit: ${profit.toFixed(2)}g (${profitMargin.toFixed(1)}%)`);
                }
            }
        }
    } catch (error) {
        console.error(`Failed to process herbs: ${error.message}`);
    } finally {
        await browser.close(); // Close the browser after all herbs are processed
    }
}

// Example usage:
getProfitableRefinedHerbs()