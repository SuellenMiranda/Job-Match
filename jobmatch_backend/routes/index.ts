import { Router } from "express";
import userRoutes from "./user.routes";
import matchRoutes from "./match.routes";
import messageRoutes from "./message.routes";
import companyRoutes from "./company.routes";

const routes = Router();

routes.use("/user", userRoutes);
routes.use("/company", companyRoutes);
routes.use("/match", matchRoutes);
routes.use("/message", messageRoutes);

export default routes;
