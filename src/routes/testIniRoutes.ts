import { Router } from "express";
import * as testIniController from "../controllers/testIniController";

const router = Router();

router.get("/", testIniController.getTestBora);

export default router;