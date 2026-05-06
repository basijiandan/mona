const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf-8');

// Update language type
code = code.replace(
  "const [lang, setLang] = useState<'zh' | 'ja'>('zh');",
  "const [lang, setLang] = useState<'zh' | 'ja' | 'en' | 'ko'>('zh');\n  const [menuOpen, setMenuOpen] = useState(false);\n\n  const handleLangSwitch = () => {\n    const langs: ('zh'|'ja'|'en'|'ko')[] = ['zh', 'ja', 'en', 'ko'];\n    setLang(langs[(langs.indexOf(lang) + 1) % 4]);\n  };\n"
);

// Update nav buttons
const oldNavRegex = /<div className="flex gap-4 pointer-events-auto">\s*<button[\s\S]*?<\/button>\s*<\/div>/;

const newNav = `<div className="flex gap-4 pointer-events-auto relative">
             <button 
               onClick={handleLangSwitch}
               className="bg-gradient-to-br from-[#ffe4e1] to-[#ffb6c1] border-2 border-pink-100 px-4 py-2 rounded-full font-black text-sm tracking-widest uppercase transition-all hover:-translate-y-1 hover:shadow-xl shadow-pink-100 flex items-center gap-2"
             >
               <Languages className="w-5 h-5" />
               语种切换
             </button>
             <div className="relative">
               <button onClick={() => setMenuOpen(!menuOpen)} className="bg-white border-2 border-pink-100 w-12 h-12 rounded-full flex items-center justify-center font-bold transition-transform hover:-translate-y-1 hover:shadow-xl shadow-pink-100 shadow-xl shadow-pink-100">
                 <Menu className="w-6 h-6"/>
               </button>
               <AnimatePresence>
                 {menuOpen && (
                   <motion.div 
                     initial={{ opacity: 0, y: 10, scale: 0.95 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     exit={{ opacity: 0, y: 10, scale: 0.95 }}
                     className="absolute right-0 top-14 bg-white/90 backdrop-blur-md border-2 border-pink-200 p-4 rounded-3xl shadow-2xl flex flex-col gap-2 min-w-[160px] z-[100]"
                   >
                     <a href="#profile" onClick={() => setMenuOpen(false)} className="px-4 py-2 hover:bg-pink-50 rounded-xl font-bold text-pink-900 transition-colors">{t.profile}</a>
                     <a href="#music" onClick={() => setMenuOpen(false)} className="px-4 py-2 hover:bg-pink-50 rounded-xl font-bold text-pink-900 transition-colors">{t.latest}</a>
                     <a href="#mv" onClick={() => setMenuOpen(false)} className="px-4 py-2 hover:bg-pink-50 rounded-xl font-bold text-pink-900 transition-colors">{t.mvPreview}</a>
                     <a href="#board" onClick={() => setMenuOpen(false)} className="px-4 py-2 hover:bg-pink-50 rounded-xl font-bold text-pink-900 transition-colors">{t.boardTitle}</a>
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
          </div>`;

code = code.replace(oldNavRegex, newNav);

fs.writeFileSync('src/App.tsx', code);
