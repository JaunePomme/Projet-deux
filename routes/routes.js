import express from "express";
const router = express.Router();

import HomeController from "../controllers/home.js";
import LoginController from "../controllers/login.js";
import ConnectController from "../controllers/connectToDash.js";
import { authMiddleware } from "../middleware/auth.js";
import DashController from "../controllers/dashboard.js";
import productController from "../controllers/product.js";
import chartController from "../controllers/chart.js";

router.get("/", HomeController);
router.get("/Dashboard", authMiddleware, DashController);
router.post("/login", LoginController);
router.get("/login", LoginController);
router.post("/connect", ConnectController);
router.get("/connect", ConnectController);
router.post("/product", productController);
router.get("/chart", authMiddleware, chartController);
export default router;
