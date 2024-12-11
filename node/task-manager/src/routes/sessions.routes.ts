
import { SessionsController } from "@/controllers/session.controller";
import { Router } from "express";

const sessionsRoutes = Router()
const sessionsController = new SessionsController()

sessionsRoutes.post("/", sessionsController.create)

export { sessionsRoutes }