import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// Unset DENO_DIR to prevent deno interference with node modules
const env = { ...process.env, DENO_DIR: undefined };

// Wait for Deno backend to start before launching Vite to prevent proxy ECONNREFUSED errors
setTimeout(() => {
  const vite = spawn('node', ['./node_modules/vite/bin/vite.js'], {
    stdio: 'inherit',
    shell: true,
    cwd: projectRoot,
    env
  });

  vite.on('exit', (code) => process.exit(code ?? 0));
}, 3000);
