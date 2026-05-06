const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(
  '{/* PAGE 2: Profile & Relationship Map */}\n      <section className="min-h-[100dvh] w-full bg-white pt-24 pb-12 flex flex-col md:flex-row relative overflow-x-hidden border-b-[8px] border-pink-200 px-8 lg:px-16 items-center custom-scrollbar">',
  '{/* PAGE 2: Profile & Relationship Map */}\n      <section id="profile" className="min-h-[100dvh] w-full bg-white pt-24 pb-12 flex flex-col md:flex-row relative overflow-x-hidden border-b-[8px] border-pink-200 px-8 lg:px-16 items-center custom-scrollbar">'
);

code = code.replace(
  '{/* PAGE 3: Horizons / Hit Songs Carousel */}\n      <section className="min-h-[100dvh] w-full bg-white pt-24 pb-12 flex flex-col border-b-[8px] border-pink-200">',
  '{/* PAGE 3: Horizons / Hit Songs Carousel */}\n      <section id="music" className="min-h-[100dvh] w-full bg-white pt-24 pb-12 flex flex-col border-b-[8px] border-pink-200">'
);

code = code.replace(
  '{/* PAGE 5: Fan Board - Cute & Interactive */}\n      <section className="min-h-[100dvh] w-full bg-gradient-to-tl from-[#fff0f5] to-[#fde2e4] pt-24 pb-32 flex flex-col items-center justify-center relative overflow-hidden">',
  '{/* PAGE 5: Fan Board - Cute & Interactive */}\n      <section id="board" className="min-h-[100dvh] w-full bg-gradient-to-tl from-[#fff0f5] to-[#fde2e4] pt-24 pb-32 flex flex-col items-center justify-center relative overflow-hidden">'
);

fs.writeFileSync('src/App.tsx', code);
