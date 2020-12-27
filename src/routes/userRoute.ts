import express from "express";
import * as userValidator from "../middleware/validators/userValidator";
import * as userController from "../controllers/userController";

const router = express.Router();

router.post("/register", userValidator.register, userController.register);

export default router;
