import { Router } from "express";
import userRoutes from "./user.routes";
import matchRoutes from "./match.routes";
import chatRoutes from "./chat.routes";
import companyRoutes from "./company.routes";

const routes = Router();

routes.use("/user", userRoutes);
routes.use("/company", companyRoutes);
routes.use("/match", matchRoutes);
routes.use("/chat", chatRoutes);

export default routes;
