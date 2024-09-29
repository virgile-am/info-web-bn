// socketHandlers.js
export const setupSocketHandlers = (io) => {
    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);
  
      // Handle mark as read event
      socket.on('markRead', async (messageId) => {
        try {
          const updatedMessage = await Message.findByIdAndUpdate(
            messageId,
            { read: true },
            { new: true }
          );
          if (updatedMessage) {
            // Broadcast to all other clients
            socket.broadcast.emit('messageRead', messageId);
          }
        } catch (error) {
          console.error('Error marking message as read:', error);
        }
      });
  
      // Handle mark all as read event
      socket.on('markAllRead', async () => {
        try {
          await Message.updateMany({ read: false }, { read: true });
          // Broadcast to all clients including sender
          io.emit('allMessagesRead');
        } catch (error) {
          console.error('Error marking all messages as read:', error);
        }
      });
  
      // Handle delete message event
      socket.on('deleteMessage', async (messageId) => {
        try {
          const deletedMessage = await Message.findByIdAndDelete(messageId);
          if (deletedMessage) {
            // Broadcast to all other clients
            socket.broadcast.emit('messageDeleted', messageId);
          }
        } catch (error) {
          console.error('Error deleting message:', error);
        }
      });
  
      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });
  };