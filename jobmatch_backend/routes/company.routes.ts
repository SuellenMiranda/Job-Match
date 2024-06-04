import { Router } from "express";
import { Company, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const companyRoutes = Router();

companyRoutes.get("/explore", async (req, res) => {
    try {
        const { id: userId }: User = req.body;

        const companies = await prisma.company.findMany({
            where: { match: { none: { userId: userId } } },
        });

        for (let i = 0; i < companies.length; i++) {
            const randPos = Math.floor(Math.random() * companies.length);
            const aux = companies[i];
            companies[i] = companies[randPos];
            companies[randPos] = aux;
        }

        res.send(companies);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

companyRoutes.post("/", async (req, res) => {
    try {
        const {
            razaoSocial,
            nomeFantasia,
            cnpj,
            email,
            setor,
            localizacao,
            descricao,
            porte,
            senha,
        }: Company = req.body;

        const createdCompany = await prisma.company.create({
            data: {
                senha,
                razaoSocial,
                nomeFantasia,
                cnpj,
                email,
                setor,
                localizacao,
                descricao,
                porte,
            },
        });

        return res.send(createdCompany);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
});

export default companyRoutes;
