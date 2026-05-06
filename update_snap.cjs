const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(/ snap-start/g, '');

fs.writeFileSync('src/App.tsx', code);
