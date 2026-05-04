async function search() {
  const titles = [
    'File:Watashi,_Idol_Sengen.png',
    'File:Fansa.jpg',
    'File:No.1.jpg',
    'File:Hokori_Takaki_Idol.png'
  ].join('|');
  const res = await fetch(`https://honeyworks.fandom.com/api.php?action=query&prop=imageinfo&iiprop=url&titles=${titles}&format=json`);
  const text = await res.text();
  console.log(text);
}
search();
