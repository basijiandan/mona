const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf-8');

// Add ids to sections
code = code.replace(
  '<section className="w-full relative bg-white py-24 min-h-screen overflow-hidden">',
  '<section id="profile" className="w-full relative bg-white py-24 min-h-screen overflow-hidden">'
);
code = code.replace(
  '<section className="w-full min-h-screen relative bg-slate-900 overflow-hidden flex flex-col justify-between py-24 border-y-8 border-pink-200">',
  '<section id="music" className="w-full min-h-screen relative bg-slate-900 overflow-hidden flex flex-col justify-between py-24 border-y-8 border-pink-200">'
);
code = code.replace(
  '<section className="w-full min-h-[80vh] relative bg-gradient-to-br from-[#ffe4e1] to-[#ffb6c1] overflow-hidden py-24 border-b-8 border-white">',
  '<section id="board" className="w-full min-h-[80vh] relative bg-gradient-to-br from-[#ffe4e1] to-[#ffb6c1] overflow-hidden py-24 border-b-8 border-white">'
);

// Add the MV Preview section before the Fan Board section
const mvSection = `
      {/* PAGE 4: MV Preview */}
      <section id="mv" className="w-full relative py-24 bg-gradient-to-br from-[#fff0f5] to-[#ffe4e1] overflow-hidden border-b-8 border-pink-200">
        <div className="absolute inset-0 bg-polka opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute top-10 left-10 font-display font-black text-[10rem] text-pink-300 opacity-20 pointer-events-none select-none tracking-tighter leading-none mix-blend-multiply">MOVIES</div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col gap-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b-4 border-pink-900 pb-6 relative">
            <div>
              <div className="bg-pink-900 text-white w-fit px-4 py-1 text-sm font-black tracking-widest uppercase mb-4 shadow-xl shadow-pink-100 transform -rotate-1">OFFICIAL VIDEO</div>
              <h2 className="font-display font-black text-6xl md:text-8xl tracking-tighter text-pink-950 uppercase">{t.mvPreview}</h2>
            </div>
          </div>

          {/* Horizontal Scrolling MV Container */}
          <div className="flex overflow-x-auto gap-8 pb-12 pt-4 snap-x snap-mandatory hide-scrollbar">
            {[
              { id: 'Fz036w08RDE', title: '私、アイドル宣言', date: '2018.02.10', tag: 'OFFICIAL MV' },
              { id: '1bWYBxa2R1s', title: 'ファンサ', date: '2019.06.21', tag: 'OFFICIAL MV' },
              { id: 'yY7Gg7F4Xl0', title: '誇り高きアイドル', date: '2021.05.28', tag: 'OFFICIAL MV' },
              { id: '6aF9BfLDBrY', title: '人生は最高の暇つぶし', date: '2020.12.26', tag: 'OFFICIAL MV' },
            ].map((mv, index) => (
              <div key={index} className="flex-none w-[85vw] md:w-[60vw] lg:w-[45vw] snap-center">
                <div className="bg-white border-4 border-pink-900 rounded-[2rem] overflow-hidden shadow-[8px_8px_0px_#831843] group relative hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_#831843] transition-all duration-300">
                  <div className="relative aspect-video w-full bg-slate-900">
                    <Player
                      url={\`https://www.youtube.com/watch?v=\${mv.id}\`}
                      width="100%"
                      height="100%"
                      controls={true}
                      light={true}
                    />
                  </div>
                  <div className="p-6 bg-yellow-50 border-t-4 border-pink-900 flex justify-between items-center gap-4">
                    <div>
                       <div className="text-xs font-black tracking-widest text-pink-600 mb-1">{mv.tag}</div>
                       <h3 className="font-display font-black text-2xl text-pink-950 line-clamp-1">{mv.title}</h3>
                    </div>
                    <div className="bg-pink-100 px-3 py-1 rounded-full border-2 border-pink-300 font-bold text-pink-800 text-sm whitespace-nowrap">
                       {mv.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAGE 5: Fan Board - Cute & Interactive */}`;

code = code.replace('{/* PAGE 4: Fan Board - Cute & Interactive */}', mvSection);

fs.writeFileSync('src/App.tsx', code);
