const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const micComponent = `
function MicCartoon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <rect x="40" y="20" width="20" height="35" rx="10" fill="#fbc531" />
      <path d="M30 40V45C30 55 38 63 48 64V80H40V85H60V80H52V64C62 63 70 55 70 45V40" stroke="#ffb6c1" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="50" cy="30" r="10" fill="#ff9ff3" opacity="0.9"/>
      <path d="M45 25 L55 25 M45 30 L55 30 M45 35 L55 35" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
`;

code = code.replace('// --- Helper Components ---', '// --- Helper Components ---\n' + micComponent);

// Let's add the MicCartoon to PAGE 4 (Fan Board)
const page4Regex = /<Heart className="w-64 h-64 text-pink-950 fill-\[#ff9ff3\] transform rotate-[^"]*" \/>/g;
code = code.replace(page4Regex, '<MicCartoon className="w-64 h-64 transform rotate-12 opacity-80" />');

fs.writeFileSync('src/App.tsx', code);
