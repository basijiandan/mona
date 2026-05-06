const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Change MonaLive2D container width:
code = code.replace(
  '<div className="w-full md:w-5/12 flex items-center justify-center pointer-events-auto z-20">',
  '<div className="w-full md:w-[60%] flex items-center justify-center pointer-events-auto z-20">'
);

// 2. Remove Album Cover Display Card
const albumRegex = /\{\/\* Album Cover Display Card \*\/\}.*?\{\/\* Interactive Phone \/ Player Element \(Center\) \*\/\}/s;
code = code.replace(albumRegex, '{/* Interactive Phone / Player Element (Center) */}');

// 3. Update Phone container
const oldPhoneStr = `          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-4/12 flex justify-center mt-8 md:mt-0 z-20"
          >
            <div className="w-[320px] bg-white rounded-[3rem] border-b-4 border-pink-100 shadow-xl shadow-pink-100 p-6 pb-8 flex flex-col relative group transform rotate-0">
               <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-40 h-8 bg-pink-900 rounded-b-2xl"></div>`;

const newPhoneStr = `          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-[40%] flex justify-center mt-8 md:mt-0 z-20"
          >
            <div className="relative w-[340px] md:w-[380px] group transform rotate-0">
               {/* Metal Frame & Shadow */}
               <div className="absolute inset-0 bg-slate-900 rounded-[3.5rem] shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-4px_4px_rgba(0,0,0,0.5),0_20px_50px_rgba(0,0,0,0.5)] pointer-events-none"></div>
               {/* Outer Bezel (Black) */}
               <div className="absolute top-[3px] left-[3px] right-[3px] bottom-[3px] bg-black rounded-[3.3rem] pointer-events-none"></div>
               
               {/* Side Buttons */}
               <div className="absolute top-[8rem] -left-[2px] w-[2px] h-8 bg-slate-700 rounded-l-md"></div>
               <div className="absolute top-[11rem] -left-[2px] w-[2px] h-14 bg-slate-700 rounded-l-md"></div>
               <div className="absolute top-[15.5rem] -left-[2px] w-[2px] h-14 bg-slate-700 rounded-l-md"></div>
               <div className="absolute top-[13rem] -right-[2px] w-[3px] h-20 bg-slate-700 rounded-r-md"></div>
               
               {/* Screen Context */}
               <div className="relative mt-[12px] mx-[12px] mb-[12px] bg-white rounded-[2.8rem] overflow-hidden flex flex-col pt-12 pb-8 px-6 shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] pointer-events-auto z-10 transition-transform h-[680px]">
                 
                 {/* Internal iPhone 14 Notch */}
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-[30px] bg-black rounded-b-[1.2rem] z-50 flex justify-center items-center pb-1">
                   {/* Speaker cutout */}
                   <div className="w-16 h-1.5 bg-[#1a1a1a] rounded-full"></div>
                   {/* Camera lens */}
                   <div className="absolute right-4 w-3 h-3 bg-[#0a0f1e] rounded-full border border-[#1e293b] flex items-center justify-center">
                     <div className="w-1 h-1 bg-blue-900/50 rounded-full"></div>
                   </div>
                 </div>`;

code = code.replace(oldPhoneStr, newPhoneStr);

// 4. Update the bottom of the Phone container
const oldPhoneBottomStr = `               <div className="w-full bg-slate-200 h-3 rounded-full border-2 border-pink-100 overflow-hidden mt-4 shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-br from-[#ffe4e1] to-[#ffb6c1] transition-all duration-1000 ease-linear border-r-2 border-pink-200"
                    style={{ width: \`\${(progress / currentSong.duration) * 100}%\` }}
                  />
               </div>
            </div>
          </motion.div>`;

const newPhoneBottomStr = `               <div className="w-full bg-slate-200 h-3 rounded-full border-2 border-pink-100 overflow-hidden mt-4 shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-br from-[#ffe4e1] to-[#ffb6c1] transition-all duration-1000 ease-linear border-r-2 border-pink-200"
                    style={{ width: \`\${(progress / currentSong.duration) * 100}%\` }}
                  />
               </div>
               
               {/* iPhone Home Indicator line */}
               <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-300 rounded-full"></div>
               
               </div> {/* Screen Context End */}
            </div>
          </motion.div>`;

code = code.replace(oldPhoneBottomStr, newPhoneBottomStr);

fs.writeFileSync('src/App.tsx', code);
