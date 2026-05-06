const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Replace image
const oldImg = `https://private-user-images.githubusercontent.com/281191314/588184543-cd5694bc-202d-4005-88d6-361dbd144cd9.JPG?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzgwNTk5NTUsIm5iZiI6MTc3ODA1OTY1NSwicGF0aCI6Ii8yODExOTEzMTQvNTg4MTg0NTQzLWNkNTY5NGJjLTIwMmQtNDAwNS04OGQ2LTM2MWRiZDE0NGNkOS5KUEc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwNTA2JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDUwNlQwOTI3MzVaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1mM2ViZDk0N2IwNjhjOWEzZTU0Yjg4NDAzNThkZWZiYWU5YjI3ZWY4ZDYxNWYzNTQzMmJmZmE1MWU1OTAyMmJlJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZyZXNwb25zZS1jb250ZW50LXR5cGU9aW1hZ2UlMkZqcGVnIn0.d6k8kux9WxqUViR-ku4HGyKZQjnxMc6M4qZWEIykPrk`;
const newImg = `https://github.com/van822853-code/mona/issues/1#issuecomment-4386724364`;
code = code.replace(oldImg, newImg);

// 2. Trans
code = code.replace('fanSite: "官方粉丝站"', 'fanSite: "mona粉丝站"');
code = code.replace('fanSite: "ファンサイト"', 'fanSite: "monaファンサイト"');

// 3. New Component
const badgeComponent = `
function FanSiteBadge({ text }: { text: string }) {
  const [starRotation, setStarRotation] = useState(0);

  return (
    <div className="relative group hidden sm:block">
      {/* Decorative Rotating Background Border Effect */}
      <div className="absolute -inset-[3px] bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 rounded-[2rem] opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-[pulse_2s_infinite]"></div>
      
      {/* Main Badge */}
      <div className="relative flex items-center gap-3 bg-white/90 backdrop-blur-sm border-2 border-pink-300 shadow-[0_0_15px_rgba(255,182,193,0.5)] px-6 py-2 rounded-[2rem] transform transition-all hover:scale-105">
        
        {/* Bow Decoration Left */}
        <Bow className="w-8 h-8 transform -rotate-[15deg] absolute -left-4 -top-3 drop-shadow-md z-20" />
        
        <span className="font-display font-black text-xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 uppercase z-10 select-none">
          {text}
        </span>

        {/* Interactive Star Right */}
        <motion.div 
          onClick={() => setStarRotation(prev => prev + 360)}
          animate={{ rotate: starRotation }}
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="cursor-pointer z-20 ml-2"
        >
          <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 drop-shadow-md" />
        </motion.div>
        
        {/* Sparkle Decorations */}
        <Sparkles className="w-4 h-4 text-pink-300 absolute -bottom-2 right-4 animate-bounce" />
        <Sparkles className="w-3 h-3 text-purple-300 absolute -top-1 right-10 animate-pulse" />
      </div>
    </div>
  );
}
`;

code = code.replace('// --- Helper Components ---', '// --- Helper Components ---\\n' + badgeComponent);

// 4. Replace the old span
const oldSpan = '<span className="font-display font-black text-xl tracking-widest uppercase bg-white px-5 py-2 border-2 border-pink-100 shadow-xl shadow-pink-100 transform rotate-0 hidden sm:block">{t.fanSite}</span>';
code = code.replace(oldSpan, '<FanSiteBadge text={t.fanSite} />');

fs.writeFileSync('src/App.tsx', code);
