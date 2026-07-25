const fs = require('fs');
const path = require('path');
const src = 'C:\\Users\\suraj\\.gemini\\antigravity-ide\\brain\\ead21ca6-babd-4757-824c-822c303fbef9\\hero_travel_background_1784987934975.png';
const destDir = 'c:\\ai travel planner\\client\\src\\assets';
const dest = path.join(destDir, 'hero-bg.png');

if (!fs.existsSync(destDir)){
    fs.mkdirSync(destDir, { recursive: true });
}
fs.copyFileSync(src, dest);
console.log('Image copied successfully.');
