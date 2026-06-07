import 'dotenv/config';
import { defineConfig } from 'vitest/config';

const TEST_DB_URL =
  process.env['TEST_DB_URL'] ??
  'postgresql://beatriz:beatriz123@localhost:5433/if-reads-test';

const JWT_SECRET =
  process.env['JWT_SECRET'] ??
  '2e79a3da619e18b44707a91c4f4b06e5e502dca11b2116c627e815642babdbcc';

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          include: ['src/**/*.spec.ts'],
          exclude: ['**/node_modules/**'],
        },
      },
      {
        test: {
          name: 'integration',
          include: ['test/integration/db/*.spec.ts'],
          globalSetup: ['./test/global-setup.ts'],
          fileParallelism: false,
          testTimeout: 30_000,
          hookTimeout: 60_000,
          env: {
            DATABASE_URL: TEST_DB_URL,
            JWT_SECRET,
            JWT_EXPIRATION: '24h',
          },
        },
      },
      {
        test: {
          name: 'e2e',
          include: ['test/e2e/**/*.e2e.spec.ts'],
          globalSetup: ['./test/global-setup.ts'],
          fileParallelism: false,
          testTimeout: 30_000,
          hookTimeout: 60_000,
          env: {
            DATABASE_URL: TEST_DB_URL,
            JWT_SECRET,
            JWT_EXPIRATION: '24h',
          },
        },
      },
    ],
  },
});
