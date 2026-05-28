import sharp from 'sharp';
import { readdir, stat, unlink } from 'fs/promises';
import { join, extname, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const IMAGE_DIRS = ['public/IMAGES', 'dist/IMAGES'];
const EXTENSIONS = ['.jpg', '.jpeg', '.png'];
const QUALITY = 90; // near-lossless quality

let totalOriginal = 0;
let totalConverted = 0;
let convertedCount = 0;

async function findImages(dir) {
  const results = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...await findImages(fullPath));
    } else if (EXTENSIONS.includes(extname(entry.name).toLowerCase())) {
      results.push(fullPath);
    }
  }
  return results;
}

async function convertImage(inputPath) {
  const ext = extname(inputPath).toLowerCase();
  const webpPath = inputPath.slice(0, -ext.length) + '.webp';
  const originalName = basename(inputPath);

  const originalSize = (await stat(inputPath)).size;

  // Skip if WebP already exists and is newer
  if (existsSync(webpPath)) {
    const webpStat = await stat(webpPath);
    if (webpStat.mtime > (await stat(inputPath)).mtime) {
      return { skipped: true, originalName, originalSize, webpSize: webpStat.size };
    }
  }

  await sharp(inputPath)
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(webpPath);

  const webpSize = (await stat(webpPath)).size;
  return { skipped: false, originalName, originalSize, webpSize, webpPath };
}

async function main() {
  console.log(`Converting images to WebP (quality: ${QUALITY})...\n`);

  for (const dir of IMAGE_DIRS) {
    const fullDir = join(root, dir);
    if (!existsSync(fullDir)) {
      console.log(`  [skip] ${dir} (not found)`);
      continue;
    }

    const images = await findImages(fullDir);
    console.log(`  ${dir}: ${images.length} images found`);

    for (const image of images) {
      const result = await convertImage(image);
      if (result.skipped) {
        console.log(`    [skip] ${result.originalName} (WebP up to date)`);
        continue;
      }
      totalOriginal += result.originalSize;
      totalConverted += result.webpSize;
      convertedCount++;
      const pct = ((1 - result.webpSize / result.originalSize) * 100).toFixed(1);
      console.log(`    [ok] ${result.originalName}: ${(result.originalSize/1024).toFixed(0)}KB -> ${(result.webpSize/1024).toFixed(0)}KB (${pct}% savings)`);
    }
  }

  const totalOriginalMB = (totalOriginal / (1024 * 1024)).toFixed(2);
  const totalConvertedMB = (totalConverted / (1024 * 1024)).toFixed(2);
  const totalSavingsPct = totalOriginal > 0 ? ((1 - totalConverted / totalOriginal) * 100).toFixed(1) : 0;

  console.log(`\n========================================`);
  console.log(`Converted: ${convertedCount} images`);
  console.log(`Original: ${totalOriginalMB} MB -> WebP: ${totalConvertedMB} MB`);
  console.log(`Total savings: ${totalSavingsPct}% (${((totalOriginal - totalConverted) / (1024*1024)).toFixed(2)} MB)`);
  console.log(`========================================`);
}

main().catch(console.error);
