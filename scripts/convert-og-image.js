import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const svgPath = path.join(__dirname, '../public/og-image.svg');
const pngPath = path.join(__dirname, '../public/og-image.png');

async function convertSvgToPng() {
  try {
    const svgBuffer = fs.readFileSync(svgPath);

    await sharp(svgBuffer, { density: 150 })
      .png({ quality: 95, progressive: true })
      .resize(1200, 630, {
        fit: 'contain',
        background: { r: 5, g: 10, b: 15 }
      })
      .toFile(pngPath);

    const stats = fs.statSync(pngPath);
    console.log(`✓ Successfully converted og-image.svg to og-image.png`);
    console.log(`  File size: ${(stats.size / 1024).toFixed(1)}KB`);
    console.log(`  Dimensions: 1200x630`);
    console.log(`  Location: ${pngPath}`);
  } catch (error) {
    console.error('✗ Error converting SVG to PNG:', error.message);
    process.exit(1);
  }
}

convertSvgToPng();
