import { Router } from "express";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

const messageRoutes = Router();

messageRoutes.get("/matchMessages/:id", async (req, res) => {
    try {
        const matchId = Number(req.params.id);

        const allChatMessages = await prisma.messages.findMany({
            where: { matchId: matchId },
        });

        res.send(allChatMessages);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

messageRoutes.post("/matchMessages/:id", async (req, res) => {
    try {
        const { message, remetente, matchId } = req.body;

        const postedMessage = await prisma.messages.create({
            data: {
                message,
                remetente,
                matchId,
            },
        });

        res.send(postedMessage);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

export default messageRoutes;
