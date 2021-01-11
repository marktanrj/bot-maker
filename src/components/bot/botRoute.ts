import express from "express";
import { authenticateUser } from "../../middlewares/authentication";
import * as botController from "./botController";

const router = express.Router();

router.post("/create", authenticateUser, botController.create);
router.post("/save", authenticateUser, botController.save);
router.post("/build", authenticateUser, botController.build);

export default router;
