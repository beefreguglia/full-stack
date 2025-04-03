import { RefundsController } from "@/controllers/refunds-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";
import { Router } from "express";

const refundsRoutes = Router();
const refundsController = new RefundsController();

refundsRoutes.post(
  "/",
  verifyUserAuthorization(["employee"]),
  refundsController.create
);

refundsRoutes.get(
  "/",
  verifyUserAuthorization(["employee"]),
  refundsController.index,
);

refundsRoutes.get(
  "/:id",
  verifyUserAuthorization(["employee", "manager"]),
  refundsController.show,
);

export { refundsRoutes };
