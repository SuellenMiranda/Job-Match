import { Router } from "express";
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import upload from "../multer";

const prisma = new PrismaClient();

const userRoutes = Router();

userRoutes.post("/login", async (req, res) => {
    try {
        const { email, senha }: User = req.body;

        const findedUser = await prisma.user.findFirst({
            where: { email: email.toLowerCase() },
            include: { match: { include: { company: true } } },
        });

        if (!findedUser) {
            return res.status(401).send({ message: "Não existe nenhum usuário com esse email!" });
        }

        const validPass = bcrypt.compareSync(senha, findedUser?.senha);

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
        const {
            nomeCompleto,
            nascimento,
            cpf,
            genero,
            endereco,
            email,
            celular,
            formacao,
            experiencia,
            habilidades,
            areaInteresse,
            senha,
        }: User = req.body;

        const createdUser = await prisma.user.create({
            data: {
                nomeCompleto,
                nascimento,
                cpf,
                genero,
                endereco,
                email,
                celular,
                formacao,
                experiencia,
                habilidades,
                areaInteresse,
                senha: bcrypt.hashSync(senha),
            },
        });

        return res.send(createdUser);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
});

userRoutes.put("/", async (req, res) => {
    try {
        const {
            id,
            nomeCompleto,
            nascimento,
            cpf,
            genero,
            endereco,
            email,
            celular,
            formacao,
            experiencia,
            habilidades,
            areaInteresse,
            senha,
        }: User = req.body;

        const createdUser = await prisma.user.update({
            where: { id: id },
            data: {
                ...(endereco ? { endereco } : {}),
                ...(email ? { email } : {}),
                ...(celular ? { celular } : {}),
                ...(formacao ? { formacao } : {}),
                ...(experiencia ? { experiencia } : {}),
                ...(habilidades ? { habilidades } : {}),
                ...(areaInteresse ? { areaInteresse } : {}),
                ...(senha ? { senha: bcrypt.hashSync(senha) } : {}),
            },
        });

        return res.send(createdUser);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
});

userRoutes.post("/fotoPerfil", upload.single("foto"), async (req, res) => {
    try {
        const files = req.files;
        console.log(files);
        return res.status(500).send("ok");

        // const createdUser = await prisma.user.update({
        //     data: {
        //         foto: files,
        //     },
        // });

        // return res.send(createdUser);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
});

export default userRoutes;
