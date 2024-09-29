// routes/index.js
import express from "express";
import userRoutes from "./userRoutes.js";
import productRoutes from "./productRoutes.js";
import messageRoutes from "./messageRoutes.js";
import visitorRoutes from "./visitorRoutes.js";
import { trackVisit } from "../controllers/visitorController.js";

const router = express.Router();

router.use(trackVisit);

router.use("/users", userRoutes);

router.use("/products", productRoutes);

router.use("/messages", messageRoutes);

router.use("/visitors", visitorRoutes);

export default router;
