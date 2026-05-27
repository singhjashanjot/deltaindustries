import { spawn } from 'child_process';

const dev = spawn('concurrently', [
  '"node scripts/dev-frontend.mjs"',
  'npm:dev:server'
], { stdio: 'inherit', shell: true });
