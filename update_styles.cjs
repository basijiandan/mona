const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Remove Brutalist Borders
code = code.replace(/border-[248] border-slate-900/g, 'border-2 border-pink-100');
code = code.replace(/border-\[8px\] border-slate-900/g, 'border-b-4 border-pink-100');
code = code.replace(/border-slate-900/g, 'border-pink-200');
code = code.replace(/border-[#0a0505]/g, 'border-yellow-200');

// 2. Adjust Shadows to soft, light shadows
code = code.replace(/shadow-\[.*?#0f172a\]/g, 'shadow-[0_8px_30px_rgb(255,192,203,0.3)]');
code = code.replace(/shadow-\[.*?rgba\(15,23,42,.*?\)]/g, 'shadow-[0_8px_30px_rgb(255,192,203,0.3)]'); // Fixed to simple shadow
code = code.replace(/shadow-\[4px_4px_0_#ff9ff3\]/g, 'shadow-[0_4px_12px_rgb(255,192,203,0.5)]');
code = code.replace(/shadow-\[.*?\]/g, 'shadow-xl shadow-pink-100');

// 3. Adjust Text Colors (Replace harsh dark slate with softer pink)
code = code.replace(/text-slate-800/g, 'text-pink-900');
code = code.replace(/text-slate-900/g, 'text-pink-950');
code = code.replace(/text-slate-700/g, 'text-stone-600');
code = code.replace(/text-slate-600/g, 'text-stone-500');

// 4. Adjust Background Colors (Softer pastels)
code = code.replace(/bg-slate-900/g, 'bg-pink-900');
code = code.replace(/bg-\[#ffc8dd\]/g, 'bg-gradient-to-br from-[#fff0f5] to-[#ffe4e1]');
code = code.replace(/bg-\[#ff9ff3\]/g, 'bg-gradient-to-br from-[#ffe4e1] to-[#ffb6c1]');
code = code.replace(/bg-\[#ff6b81\]/g, 'bg-pink-300');
code = code.replace(/bg-\[#ffafcc\]/g, 'bg-gradient-to-tl from-[#fff0f5] to-[#fde2e4]');
code = code.replace(/bg-\[#f0f0f0\]/g, 'bg-white');

// 5. Turn sharp borders into rounded
code = code.replace(/rounded-\[2\.5rem\]/g, 'rounded-[2rem]');

// 6. Reduce harsh rotations
code = code.replace(/rotate-\[-2deg\]/g, 'rotate-0');
code = code.replace(/rotate-\[1deg\]/g, 'rotate-0');
code = code.replace(/rotate-\[-1deg\]/g, 'rotate-0');
code = code.replace(/rotate-\[-10deg\]/g, 'rotate-[-3deg]');
code = code.replace(/rotate-12/g, 'rotate-6');
code = code.replace(/rotate-\[-12deg\]/g, 'rotate-[-6deg]');
code = code.replace(/-rotate-12/g, '-rotate-6');
code = code.replace(/-rotate-2/g, 'rotate-0');
code = code.replace(/rotate-2/g, 'rotate-0');
code = code.replace(/-rotate-1/g, 'rotate-0');
code = code.replace(/rotate-1/g, 'rotate-0');
code = code.replace(/-rotate-3/g, 'rotate-0');

fs.writeFileSync('src/App.tsx', code);
