async function search() {
  const res = await fetch(`https://itunes.apple.com/search?term=HoneyWorks+Mona+ファンサ&entity=song&limit=50`);
  const data = await res.json();
  data.results.forEach(t => {
    console.log(t.trackName, t.artworkUrl100.replace('100x100', '600x600'));
  });
  
  const res2 = await fetch(`https://itunes.apple.com/search?term=HoneyWorks+Mona&entity=song&limit=50`);
  const data2 = await res2.json();
  data2.results.forEach(t => {
    console.log(t.trackName, t.artworkUrl100.replace('100x100', '600x600'));
  });
}
search();
