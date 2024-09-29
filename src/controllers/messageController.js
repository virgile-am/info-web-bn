 // controllers/messageController.js
import Message from '../database/models/Message.js';
import { sendEmailNotification } from '../utils/emailUtils.js';


export const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newMessage = new Message({
      name,
      email,
      subject,
      message,
    });

    await newMessage.save();

    await sendEmailNotification({ name, email, subject, message });

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markAllMessagesAsRead = async (req, res) => {
  try {
    const updatedMessages = await Message.updateMany(
      { read: false },
      { read: true }
    );
    res.json({ message: `${updatedMessages.modifiedCount} messages marked as read` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const markMessageAsRead = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json({ message: 'Message marked as read', data: updatedMessage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMessage = await Message.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json({ message: 'Message deleted successfully', data: deletedMessage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};