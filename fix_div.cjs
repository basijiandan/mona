const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(/<\/section>/, '</div>\n      </section>');

fs.writeFileSync('src/App.tsx', code);
