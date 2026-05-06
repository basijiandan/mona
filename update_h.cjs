const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(/<section className="h-\[100dvh\]/g, '<section className="min-h-[100dvh]');

fs.writeFileSync('src/App.tsx', code);
