import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'npm run seed',
  },
  datasource: {
    url:
      process.env.DATABASE_URL ??
      'postgresql://neondb_owner:npg_1tbF7EerSDwA@ep-morning-bonus-ans3k99u.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require',
  },
});
