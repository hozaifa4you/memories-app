import express from "express";

import UserControllers from "../controllers/userCtrl.js";

const router = express.Router();

router.post("/signin", UserControllers.signin);
router.post("/signup", UserControllers.signup);

export default router;
