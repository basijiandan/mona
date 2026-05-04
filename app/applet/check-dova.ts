import https from 'https';

https.get('https://dova-s.jp/bgm/play11776.html', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log(data.match(/おまちかねランチタイム/)));
});
