import express from "express";
import * as botController from "./botController";

const router = express.Router();

router.post("/save", botController.save);
router.post("/build", botController.build);

export default router;
