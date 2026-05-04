const https = require('https');

https.get('https://b23.tv/XJuqVBS', (res) => {
  console.log(res.headers.location);
}).on('error', (e) => {
  console.error(e);
});
