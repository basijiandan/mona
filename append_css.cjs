const fs = require('fs');
fs.appendFileSync('src/index.css', `\n.hide-scrollbar::-webkit-scrollbar {\n  display: none;\n}\n.hide-scrollbar {\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n`);
