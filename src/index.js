const express = require('express');
const app = express();
const prisma = require("./lib/prisma");
const authRouter = require("./routes/auth");

const PORT = process.env.PORT || 3000;

//import router
const questionsRouter = require("./routes/questions.js");

// Middleware to parse JSON bodies (will be useful in later steps)
app.use(express.json());

//declare path /routes
app.use("/api/auth", authRouter);
app.use("/api/questions", questionsRouter);

app.use((req, res) => {
  res.json({msg: "Not found"});
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
