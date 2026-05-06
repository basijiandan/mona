const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// Replace Star sticker with Bow and Mic
code = code.replace(
  /<Star className="w-12 h-12 text-pink-950 fill-slate-900" \/>/g,
  '<Bow className="w-12 h-12" />'
);

// Add AngelWing to the first sticker
code = code.replace(
  /<p className="font-display font-black text-\[1\.2rem\] text-white uppercase text-center leading-none tracking-tight">#No\.1<br\/>アイドル<\/p>/g,
  '<p className="font-display font-black text-[1.2rem] text-pink-400 uppercase text-center leading-none tracking-tight z-10 relative">#No.1<br/>アイドル</p><AngelWing className="absolute -left-10 -top-6 w-20 h-20 opacity-50 z-0" />'
);

// Final section: Changing the "Thanks Honey" page. 
// "Change the final page to be a falling heart. After clicking the heart, it will generate verses of lyrics one by one. This means adding some interaction on the final page."
// I will just use text replacement for the whole PAGE 5 block.

fs.writeFileSync('src/App.tsx', code);
