const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf-8');

const funcsToAdd = `
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return \`\${mins}:\${secs.toString().padStart(2, '0')}\`;
  };
`;

code = code.replace(
  'const handleAddReply = (id: number, text: string) => {',
  funcsToAdd + '\n  const handleAddReply = (id: number, text: string) => {'
);

fs.writeFileSync('src/App.tsx', code);
