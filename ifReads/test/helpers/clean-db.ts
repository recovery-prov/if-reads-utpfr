import { PrismaClient } from '../../src/generated/prisma/index.js';

export async function cleanDb(prisma: PrismaClient) {
  await prisma.$executeRawUnsafe(
    `TRUNCATE TABLE reviews, authors, fictions, users RESTART IDENTITY CASCADE`,
  );
}
