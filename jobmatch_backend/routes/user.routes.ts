import { Router } from "express";
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const userRoutes = Router();

userRoutes.post("/login", async (req, res) => {
    try {
        const { email, password }: User = req.body;

        const findedUser = await prisma.user.findFirst({
            where: { email: email.toLowerCase() },
            include: { match: { include: { company: true } } },
        });

        if (!findedUser) {
            return res.status(401).send({ message: "Não existe nenhum usuário com esse email!" });
        }

        const validPass = bcrypt.compareSync(password, findedUser?.password);

        if (!validPass) {
            return res.status(401).send({ message: "Senha incorreta!" });
        }

        res.send(findedUser);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
});

userRoutes.post("/", async (req, res) => {
    try {
        const { name, password, email, phone, state, city }: User = req.body;

        const createdUser = await prisma.user.create({
            data: {
                name,
                password: bcrypt.hashSync(password),
                email,
                phone,
                state,
                city,
            },
        });

        return res.send(createdUser);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
});

export default userRoutes;
