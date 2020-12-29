import express from "express";
import * as userValidator from "./userValidator";
import * as userController from "./userController";

const router = express.Router();

router.post("/register", userValidator.register, userController.register);
router.post("/signin", userValidator.signIn, userController.signIn);

export default router;
