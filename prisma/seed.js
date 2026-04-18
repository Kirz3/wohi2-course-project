const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const seedQuestions = [
  {
    id: 1,
    question: "Which country has the most natural lakes in the world?",
    answer: "Canada",
    keywords: ["country", "lakes",],
  },
  {
    id: 2,
    question: "In what year did the Berlin Wall fall occur?",
    answer: "1989",
    keywords: ["berlin wall", "germany", "history",],
  },
  {
    id: 3,
    question: "Who played Jack in the Titanic?",
    answer: "Leonardo DiCaprio",
    keywords: ["titanic", "movie", "tv",],
  },
  {
    id: 4,
    question: "What is the chemical symbol for gold?",
    answer: "Au",
    keywords: ["chemistry", "elements",],
  },
  {
    id: 5,
    question: "What is the capital of Australia?",
    answer: "Canberra",
    keywords: ["australia", "geography",],
  },
];

async function main() {
  await prisma.question.deleteMany();
  await prisma.keyword.deleteMany();

  for (const question of seedQuestions) {
    await prisma.question.create({
      data: {
        question: question.question,
        answer: question.answer,
        keywords: {
          connectOrCreate: question.keywords.map((kw) => ({
            where: { name: kw },
            create: { name: kw },
          })),
        },
      },
    });
  }

  console.log("Seed data inserted successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

