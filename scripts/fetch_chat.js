const { chromium } = require('@playwright/test');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Navigating to share link...');
  await page.goto('https://gemini.google.com/share/2ad50e5d9387', { waitUntil: 'networkidle', timeout: 30000 });

  await page.waitForTimeout(5000);

  const title = await page.title();
  console.log('Page Title:', title);

  const bodyText = await page.evaluate(() => document.body.innerText);
  fs.writeFileSync('chat_text.txt', bodyText, 'utf8');
  console.log('Saved chat_text.txt. Length:', bodyText.length);

  // Extract structured conversation turns if possible
  const turns = await page.evaluate(() => {
    // Look for message containers
    const queries = Array.from(document.querySelectorAll('.user-query-container, .query-content, [data-message-author-role="user"], .user-query'));
    const responses = Array.from(document.querySelectorAll('.model-response-text, .response-content, [data-message-author-role="model"], .model-response'));
    
    return {
      queries: queries.map(q => q.innerText),
      responses: responses.map(r => r.innerText)
    };
  });
  fs.writeFileSync('chat_turns.json', JSON.stringify(turns, null, 2), 'utf8');

  await browser.close();
})().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
