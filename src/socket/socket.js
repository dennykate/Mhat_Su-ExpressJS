// socket.js
import { Server } from "socket.io";
import { decode } from "../libs/jwt.js";
import {
  createMessageService,
  deleteMessageService,
  updateMessageService,
} from "../services/message.service.js";
import {
  addReactionService,
  removeReactionService,
} from "../services/reactions.service.js";

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  global.onlineUsers = new Map();

  io.on("connection", (socket) => {
    global.chatSocket = socket;

    console.log(`User connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });

    socket.on("new-user", async (data) => {
      const { user } = await decode(data.accessToken);

      io.emit("new-user", { user });
    });

    socket.on("init-chat", (userId) => {
      console.log("user id => ", userId);
      onlineUsers.set(userId, socket.id);
    });

    socket.on("send-message", async (data) => {
      const message = await createMessageService(data);

      if (message) {
        const sendUserSocket = onlineUsers.get(message.recipient);

        if (sendUserSocket) {
          socket.to(sendUserSocket).emit("receive-message", message);
        }
      }
    });

    socket.on("delete-message", async (messageId) => {
      const deleteMessage = await deleteMessageService(messageId);

      if (deleteMessage) {
        const sendUserSocket = onlineUsers.get(deleteMessage.recipient);

        if (sendUserSocket) {
          socket
            .to(sendUserSocket)
            .emit("receive-delete-message", deleteMessage._id);
        }
      }
    });

    socket.on("update-message", async (messageId) => {
      const updateMessage = await updateMessageService(messageId);

      if (updateMessage) {
        const sendUserSocket = onlineUsers.get(updateMessage.recipient);

        if (sendUserSocket) {
          socket
            .to(sendUserSocket)
            .emit("receive-update-message", updateMessage);
        }
      }
    });

    socket.on("add-reaction", async (data) => {
      const message = await addReactionService(data);

      if (message) {
        const sendUserSocket = findRecipientUser(message.recipient);

        if (sendUserSocket) {
          socket.to(sendUserSocket).emit("receive-add-reaction", {
            messageId: message._id,
            reactionUserId: data.userId,
            reactionType: data.reactionType,
          });
        }
      }
    });

    socket.on("remove-reaction", async (data) => {
      const message = await removeReactionService(data);

      if (message) {
        const sendUserSocket = findRecipientUser(message.recipient);

        if (sendUserSocket) {
          socket.to(sendUserSocket).emit("receive-remove-reaction", {
            messageId: message._id,
            reactionUserId: data.userId,
            reactionType: data.reactionType,
          });
        }
      }
    });

    const findRecipientUser = (recipientId) => {
      return onlineUsers.get(recipientId);
    };
  });

  return io;
};

export default initializeSocket;
