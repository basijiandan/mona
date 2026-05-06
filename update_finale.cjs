const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// The new InteractiveFinale component
const finaleComponent = `
const FINALE_LYRICS = [
  "いつも応援してくれてありがとう✨",
  "みんなの笑顔が、私のNo.1の宝物！",
  "これからも、もっともっと輝くから",
  "ずっとそばで見ててね！",
  "ラブ！💕"
];

function InteractiveFinale() {
  const [clicks, setClicks] = useState(0);
  
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-8 z-10 text-center">
      <AnimatePresence>
        {FINALE_LYRICS.slice(0, clicks).map((line, i) => (
           <motion.div
             key={i}
             initial={{ opacity: 0, scale: 0.8, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             transition={{ type: 'spring', bounce: 0.5 }}
             className="text-2xl md:text-3xl font-black text-pink-600 mb-6 drop-shadow-sm tracking-widest bg-white/80 px-6 py-3 rounded-full border-2 border-white"
           >
              {line}
           </motion.div>
        ))}
      </AnimatePresence>

      {clicks < FINALE_LYRICS.length && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <motion.button 
            initial={{ y: -500, opacity: 0 }}
            animate={{ y: [0, -20, 0], opacity: 1 }}
            transition={{ y: { repeat: Infinity, duration: 2, ease: "easeInOut" }, opacity: { duration: 1 } }}
            onClick={() => setClicks(c => c + 1)}
            className="pointer-events-auto mt-[40vh] bg-gradient-to-br from-white to-pink-50 p-6 rounded-full border border-pink-100 shadow-2xl shadow-pink-200 hover:scale-110 active:scale-90 transition-transform relative"
          >
            <AngelWing className="absolute -left-12 -top-6 w-24 h-24 opacity-80" />
            <AngelWing className="absolute -right-12 -top-6 w-24 h-24 opacity-80" flip />
            <Heart className="w-16 h-16 text-pink-400 fill-pink-400 relative z-10" />
          </motion.button>
        </div>
      )}
      
      {clicks === 0 && (
        <p className="absolute bottom-32 text-pink-400 font-bold animate-pulse text-sm tracking-widest uppercase">Click the falling heart</p>
      )}
      
      {clicks >= FINALE_LYRICS.length && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="mt-12 flex flex-col items-center"
        >
          <Bow className="w-20 h-20 mb-4" />
          <p className="font-display font-black text-5xl text-pink-500 tracking-tighter italic drop-shadow-sm">
            Thank you!
          </p>
        </motion.div>
      )}
    </div>
  );
}
`;

// Insert the component before App
code = code.replace('export default function App() {', finaleComponent + '\nexport default function App() {');

// Replace PAGE 5 content
const page5Regex = /\{\/\* PAGE 5: Thank You Section \*\/\}.*?\{\/\* Global Fixed Bottom Player Timeline \*\/\}/s;
const newPage5 = `{/* PAGE 5: Thank You Section */}
      <section className="h-[100dvh] w-full bg-gradient-to-br from-[#fff0f5] to-[#ffe4e1] relative flex flex-col justify-center items-center overflow-hidden border-b-4 border-pink-100 px-4">
        <div className="absolute inset-0 bg-polka opacity-10 pointer-events-none mix-blend-multiply"></div>
        <FallingStars />
        <InteractiveFinale />
        
        {/* Background Decorative Text Layer */}
        <div className="absolute top-[15%] left-[5%] font-display font-black text-[12rem] text-pink-100 opacity-50 pointer-events-none select-none tracking-tighter leading-none">THANKS</div>
        <div className="absolute bottom-[10%] right-[5%] font-display font-black text-[12rem] text-pink-100 opacity-50 pointer-events-none select-none tracking-tighter leading-none">HONEY</div>

        <div className="absolute bottom-10 flex flex-col items-center gap-2 opacity-40">
          <p className="text-pink-900 font-black tracking-[0.3em] text-[12px] uppercase">Narumi Mona Official Archive • 2026</p>
          <div className="w-24 h-1 bg-pink-900 rounded-full"></div>
        </div>
      </section>

      {/* Global Fixed Bottom Player Timeline */}`;

code = code.replace(page5Regex, newPage5);

fs.writeFileSync('src/App.tsx', code);
