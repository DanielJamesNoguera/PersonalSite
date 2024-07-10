const axios = require('axios');

async function sendDiscordAlert(transaction) {
  try {
    const embedMessage = {
      username: 'DeBank Alerter', // Set the username
      avatar_url: 'https://cdn.freelogovectors.net/wp-content/uploads/2022/03/debank_logo_freelogovectors.net_.png', // Set the avatar URL
      embeds: [
        {
          title: 'New Transaction',
          description: `[View Transaction](${transaction.txLink})`,
          color: 5814783, // Customize the color if needed
          fields: [
            { name: 'Date', value: transaction.date || 'N/A', inline: true },
            { name: 'Action', value: transaction.action || 'N/A', inline: true },
            { name: 'Project', value: transaction.project || 'N/A', inline: true },
            { name: 'Amount', value: `${transaction.tokenAmount || 'N/A'} ${transaction.tokenName || ''}`, inline: true },
          ],
          thumbnail: { url: transaction.chainImg || '' },
          footer: { text: `Transaction Hash: ${transaction.txHash || 'N/A'}` },
        },
      ],
    };

    await axios.post("https://discord.com/api/webhooks/1259975481357504634/YQFqLF7QshEpxJJVhHUEYr3SKW_02xXRGSy4s1ahWEt6vTWkFsa3CbOLNZIpmq6zzNe4", embedMessage);
    console.log('Alert sent to Discord');
  } catch (error) {
    console.error('Error sending alert to Discord:', error);
  }
}

module.exports = { sendDiscordAlert };