const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');
code = code.replace(/#fef08a/g, '#ffc8dd');
fs.writeFileSync('src/App.tsx', code);
