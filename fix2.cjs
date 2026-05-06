const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(/  const scrollRight = \(\) => \{\n    if \(carouselRef\.current\) \{\n      carouselRef\.current\.scrollBy\(\{ left: 400, behavior: 'smooth' \}\);\n    \}\n  \};\n/, '');

fs.writeFileSync('src/App.tsx', code);
