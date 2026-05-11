import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcryptjs';
import { PrismaClient } from '../src/generated/prisma/index.js';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error(
    'DATABASE_URL não definida. Crie um arquivo .env com a variável DATABASE_URL.',
  );
}
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.review.deleteMany();
  await prisma.author.deleteMany();
  await prisma.fiction.deleteMany();
  await prisma.user.deleteMany();

  const [alice, bob] = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Alice Monteiro',
        email: 'alice@ifreads.com',
        password: await bcrypt.hash('senha123', 10),
      },
    }),
    prisma.user.create({
      data: {
        name: 'Bob Ferreira',
        email: 'bob@ifreads.com',
        password: await bcrypt.hash('senha123', 10),
      },
    }),
  ]);

  const admin = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@ifreads.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'ADMIN',
    },
  });

  const [dracula, frankenstein] = await Promise.all([
    prisma.fiction.create({
      data: {
        title: 'Drácula: A Escolha',
        description:
          'Uma ficção interativa baseada no universo de Bram Stoker.',
        genre: 'Horror',
        publishedAt: 2023,
        authorId: alice.id,
        authors: {
          create: [
            { name: 'Alice Monteiro', role: 'main_author' },
            { name: 'Carlos Lima', role: 'co_author' },
          ],
        },
      },
    }),
    prisma.fiction.create({
      data: {
        title: 'Frankenstein Reimaginado',
        description: 'E se você fosse a criatura, não o criador?',
        genre: 'Sci-Fi',
        publishedAt: 2024,
        authorId: bob.id,
        authors: {
          create: [{ name: 'Bob Ferreira', role: 'main_author' }],
        },
      },
    }),
  ]);

  await Promise.all([
    prisma.review.create({
      data: {
        rating: 5,
        comment: 'Narrativa incrível, adorei as escolhas!',
        narrative: 5,
        interactivity: 4,
        originality: 5,
        fictionId: dracula.id,
        authorId: bob.id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 4,
        comment: 'Muito criativo, a perspectiva da criatura é única.',
        narrative: 4,
        interactivity: 4,
        originality: 5,
        fictionId: frankenstein.id,
        authorId: alice.id,
      },
    }),
  ]);

  console.log('Seed concluído!');
  console.log(`  Usuários: ${alice.name}, ${bob.name}, ${admin.name} (ADMIN)`);
  console.log(`  Ficções: "${dracula.title}", "${frankenstein.title}"`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
