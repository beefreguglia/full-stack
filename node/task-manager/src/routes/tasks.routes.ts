
import { TasksController } from "@/controllers/tasks.controller";
import { Router } from "express";

const tasksRoutes = Router()
const tasksController = new TasksController()

tasksRoutes.post("/:teamId", tasksController.create)

export { tasksRoutes }