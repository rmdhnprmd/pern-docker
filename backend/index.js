import express from "express"
import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient();
const app = express();

// json
app.use(express.json());

//cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// test api
app.get("/test", (req, res) => {
  try {
    res.status(200).json({
      message: "API is working",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// get all users
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
});

// get user by id
app.get("/users/:id", async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
});

// create user
app.post("/users", async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
});

// update user
app.put("/users/:id", async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = Number(req.params.id);

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: name,
        email: email,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
});

// delete user
app.delete("/users/:id", async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const user = await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    res.status(200).json({
      message: "Success delete",
      user
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
});

// start server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
