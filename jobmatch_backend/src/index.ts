import express from "express";
import routes from "../routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
