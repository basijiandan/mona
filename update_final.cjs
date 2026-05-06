const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Remove Cute Floating Elements
const cuteRegex = /\{\/\* Cute Floating Elements \*\/\}.*?\{\/\* Mona Live2D Interactive Character \*\/\}/s;
code = code.replace(cuteRegex, '{/* Mona Live2D Interactive Character */}');

// 2. Remove Decorative Stickers (Right)
const decoRegex = /\{\/\* Decorative Stickers \(Right\) - Hidden on small screens \*\/\}.*?<\/section>/s;
code = code.replace(decoRegex, '</section>');

// 3. Make the image show in the Interactive Finale
const finaleRegex = /\{clicks >= FINALE_LYRICS\.length && \(\s*<motion\.div[\s\S]*?<\/motion\.div>\s*\)\}/s;
const newFinale = `{clicks >= FINALE_LYRICS.length && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mt-8 flex flex-col items-center z-20"
        >
          <div className="border-[12px] border-white shadow-2xl shadow-pink-200 transform rotate-[-2deg] hover:rotate-[2deg] transition-transform duration-500 max-w-sm w-full bg-white pb-12 relative">
            <img 
              src="https://private-user-images.githubusercontent.com/281191314/588184543-cd5694bc-202d-4005-88d6-361dbd144cd9.JPG?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzgwNTk5NTUsIm5iZiI6MTc3ODA1OTY1NSwicGF0aCI6Ii8yODExOTEzMTQvNTg4MTg0NTQzLWNkNTY5NGJjLTIwMmQtNDAwNS04OGQ2LTM2MWRiZDE0NGNkOS5KUEc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwNTA2JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDUwNlQwOTI3MzVaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1mM2ViZDk0N2IwNjhjOWEzZTU0Yjg4NDAzNThkZWZiYWU5YjI3ZWY4ZDYxNWYzNTQzMmJmZmE1MWU1OTAyMmJlJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZyZXNwb25zZS1jb250ZW50LXR5cGU9aW1hZ2UlMkZqcGVnIn0.d6k8kux9WxqUViR-ku4HGyKZQjnxMc6M4qZWEIykPrk"
              alt="Mona Live"
              className="w-full aspect-[4/5] object-cover"
            />
            <div className="absolute bottom-3 right-4 font-display font-black text-xl text-pink-400">
               Thank you!
            </div>
            <Bow className="absolute -top-6 -left-6 w-16 h-16 transform -rotate-12" />
          </div>
        </motion.div>
      )}`;

code = code.replace(finaleRegex, newFinale);

fs.writeFileSync('src/App.tsx', code);
