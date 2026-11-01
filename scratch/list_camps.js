const https = require('https');
https.get('https://test-gamma-azure-65.vercel.app/api/campaigns', {
  headers: { 'Accept-Encoding': 'identity', 'User-Agent': 'Mozilla/5.0' }
}, (res) => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const data = JSON.parse(d);
    const camps = data.items || [];
    console.log('Total campaigns:', camps.length);
    camps.forEach(c => {
      console.log(c.id + ' | slug: ' + c.slug + ' | status: ' + c.status + ' | title: ' + c.title);
    });
  });
});

