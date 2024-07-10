const puppeteer = require('puppeteer');
const { sendDiscordAlert } = require('./discord');

async function scrapeRecentTransactionsForAddress(address) {
  // Launch a new browser instance
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Go to the provided URL
  await page.goto(`https://debank.com/profile/${address}/history`, { waitUntil: 'networkidle2' });
  console.log('Page loaded.');

  // Waiting for the main transaction table to load and for the loading spinner to disappear
  console.log('Waiting for the transactions table to load...');
  await page.waitForSelector('.History_table__uvlpK');
  await page.waitForFunction(() => !document.querySelector('.History_loadingHistory__PO5ya'));
  console.log('Transactions table loaded and spinner disappeared.');

  const transactions = await page.evaluate(() => {
    const table = document.querySelector('.History_table__uvlpK');
    const rows = table ? table.children : [];
    const transactionData = [];

    for (let i = 0; i < rows.length; i++) {
      const transaction = rows[i];

      if (transaction.querySelector('.History_scam__MGd0s')) {
        console.log('Skipping scam transaction:', transaction.outerHTML);
        continue;
      }

      const dateElement = transaction.querySelector('.History_sinceTime__yW4eC');
      const chainImgElement = transaction.querySelector('.History_rowChain__7AZeX');
      const txLinkElement = transaction.querySelector('.History_rowChain__7AZeX + a');
      const actionElement = transaction.querySelector('.TransactionAction_action__kSUDW');
      const projectElement = transaction.querySelector('.TransactionAction_projectName__Wx9cA');
      const tokenAmountElement = transaction.querySelector('.ChangeTokenList_tokenTitle__ZLDAR');
      const tokenNameElement = transaction.querySelector('.ChangeTokenList_tokenName__X1QXR');

      transactionData.push({
        date: dateElement ? dateElement.innerText : null,
        chainImg: chainImgElement ? chainImgElement.src : null,
        txLink: txLinkElement ? txLinkElement.href : null,
        txHash: txLinkElement ? txLinkElement.innerText : null,
        action: actionElement ? actionElement.innerText : null,
        project: projectElement ? projectElement.innerText : null,
        tokenAmount: tokenAmountElement ? tokenAmountElement.innerText : null,
        tokenName: tokenNameElement ? tokenNameElement.innerText : null,
      });
    }

    return transactionData;
  });

  console.log('Transactions data:', transactions);

  await browser.close();
  return transactions;
}

(async () => {
  const address = '0x9bacec26542a3652a131aff8ae10bd0787cfed1a';
  console.log('Starting transaction scraping...');
  const transactions = await scrapeRecentTransactionsForAddress(address);
  await sendDiscordAlert(transactions[0]);
  console.log('Transactions scraped:', transactions);
})();