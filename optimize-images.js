// optimize-images.js
// Script to optimize all images in Org_code/images/
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminWebp = require('imagemin-webp');
const path = require('path');
const fs = require('fs');

const inputDir = path.join(__dirname, 'Org_code', 'images');
const outputDir = inputDir; // Overwrite originals

(async () => {
  const files = fs.readdirSync(inputDir).filter(file => /\.(jpe?g|png|gif)$/i.test(file));
  if (files.length === 0) {
    console.log('No images found to optimize.');
    return;
  }
  const filePaths = files.map(f => path.join(inputDir, f));
  const optimized = await imagemin(filePaths, {
    destination: outputDir,
    plugins: [
      imageminMozjpeg({ quality: 75 }),
      imageminPngquant({ quality: [0.6, 0.8] }),
      imageminGifsicle({ optimizationLevel: 2 }),
      imageminWebp({ quality: 75 })
    ]
  });
  console.log(`Optimized ${optimized.length} images in ${inputDir}`);
})();
