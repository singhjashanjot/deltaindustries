import { spawn } from 'child_process';

const frontend = spawn('npx', ['vite'], { stdio: 'inherit', shell: true });
const backend = spawn('node', ['scripts/run-with-dev-env.mjs', 'tsx', 'watch', 'server/index.ts'], { stdio: 'inherit', shell: false });

function cleanup() {
  frontend.kill();
  backend.kill();
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

frontend.on('exit', (code) => {
  backend.kill();
  process.exit(code ?? 0);
});

backend.on('exit', (code) => {
  frontend.kill();
  process.exit(code ?? 0);
});
