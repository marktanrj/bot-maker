import express from "express";
import * as userValidator from "./userValidator";
import * as userController from "./userController";

const router = express.Router();

router.post("/register", userValidator.register, userController.register);

export default router;
