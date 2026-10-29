const fs = require('fs');
const html = fs.readFileSync('share.html', 'utf8');

let pos = 0;
while ((pos = html.indexOf('2ad50e5d9387', pos)) !== -1) {
  console.log(`Found ID at ${pos}: ${html.slice(Math.max(0, pos - 100), Math.min(html.length, pos + 400))}`);
  pos += 12;
}
