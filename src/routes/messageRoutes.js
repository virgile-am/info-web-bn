// routes/messageRoutes.js
import express from "express";
import {
  sendMessage,
  getMessages,
  markAllMessagesAsRead,
  markMessageAsRead,
  deleteMessage,
} from "../controllers/messageController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", sendMessage);

router.get("/", protect, getMessages);
router.put("/", protect, markAllMessagesAsRead);
router.put("/:id/read", protect, markMessageAsRead);
router.delete("/:id", protect, deleteMessage);

export default router;
