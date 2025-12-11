import { Router } from "express";
import auth from "../../middleware/auth";
import { userController } from "./user.controllers";

const router = Router();

router.get("/", auth("admin"), userController.getAllUsers);
router.put("/:userId", auth("admin", "customer"), userController.updateSingleUser);
router.delete("/:userId", auth("admin"), userController.deleteSingleUser);

export const useRoutes = router;