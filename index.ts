import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const app = express();

// middlewares
app.use(express.json());

app.listen(3001, () => {
  console.log("Server @ 3001");
});

const prisma = new PrismaClient();

app.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        username: username,
        password: password,
      },
    });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

app.get("/", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get("/user/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(user);
});

app.put("/", async (req: Request, res: Response) => {
  const { id, username } = req.body;
  const updatedUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      username: username,
    },
  });
});

app.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const deletedUser = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(deletedUser);
});

app.get("/cars", async (req: Request, res: Response) => {
  const cars = await prisma.car.findMany();
  res.json(cars);
});

app.post("/car", async (req: Request, res: Response) => {
  const { model, year, user } = req.body;
  try {
    const car = await prisma.car.create({
      data: {
        year: Number(year),
        model: model,
        userId: Number(user),
      },
    });
    res.json(car);
  } catch (err) {
    console.log(err);
  }
});
