import { execSync } from 'child_process';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const backendRoot = path.resolve(__dirname, '..');

export function setup() {
  console.log('\n[global-setup] Running migrations on test database...');
  execSync('npx prisma migrate deploy', {
    cwd: backendRoot,
    env: {
      ...process.env,
      DATABASE_URL:
        process.env.TEST_DB_URL ??
        'postgresql://beatriz:beatriz123@localhost:5433/if-reads-test',
    },
    stdio: 'inherit',
  });
  console.log('[global-setup] Migrations complete.\n');
}
