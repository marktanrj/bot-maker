import express from "express";
import { authenticateUser } from "../../middlewares/authentication";
import * as botController from "./botController";

const router = express.Router();

router.post("/create", authenticateUser, botController.create);
router.post("/save", authenticateUser, botController.save);
router.get("/load", authenticateUser, botController.load);
router.post("/build", authenticateUser, botController.build);
router.post("/deleteBot", authenticateUser, botController.deleteBot);
router.get("/getBotsList", authenticateUser, botController.getBotsList);

export default router;
