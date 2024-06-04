import { Router } from "express";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

const matchRoutes = Router();

matchRoutes.get("/fromUser/:id", async (req, res) => {
    try {
        const { id: userId }: User = req.body;

        const matches = await prisma.match.findMany({
            where: { userId: userId },
            include: { company: true },
        });

        res.send(matches);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

matchRoutes.post("/", async (req, res) => {
    try {
        const { userId, empresaId } = req.body;

        const createdMatch = await prisma.match.create({
            data: {
                companyId: empresaId,
                userId: userId,
            },
        });

        res.send(createdMatch);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

export default matchRoutes;
