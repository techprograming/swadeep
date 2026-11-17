const fs = require('fs');
const path = require('path');

const reviewImages = [
  {
    url: 'https://www.swadeep.org/wp-content/uploads/2022/08/Pradeep-80x80.png',
    dest: 'pradeep-kumar-ghosal.png'
  },
  {
    url: 'https://www.swadeep.org/wp-content/uploads/2022/10/AIF-Logo-100x80.png',
    dest: 'aif-logo.png'
  },
  {
    url: 'https://www.swadeep.org/wp-content/uploads/2022/10/DNH-Logo-80x80.png',
    dest: 'dnh-logo.png'
  },
  {
    url: 'https://www.swadeep.org/wp-content/uploads/2024/05/Dishaben-80x80.jpeg',
    dest: 'dishaben.jpg'
  },
  {
    url: 'https://www.swadeep.org/wp-content/uploads/2024/05/Vinodbhai-80x80.jpeg',
    dest: 'vinodbhai.jpg'
  }
];

async function downloadImages() {
  const destDir = path.join(process.cwd(), 'public', 'images', 'reviews');
  fs.mkdirSync(destDir, { recursive: true });

  for (const item of reviewImages) {
    const destPath = path.join(destDir, item.dest);
    try {
      console.log(`Downloading ${item.url} -> ${item.dest}...`);
      const res = await fetch(item.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(destPath, buffer);
      console.log(`  Saved ${item.dest} (${buffer.length} bytes)`);
    } catch (err) {
      console.error(`  Failed ${item.dest}:`, err.message);
    }
  }
}

downloadImages();

