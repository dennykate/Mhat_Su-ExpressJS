// socket.js
import { Server } from "socket.io";
import { decode } from "../libs/jwt.js";

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });

    socket.on("new-user", async (data) => {
      const { user } = await decode(data.accessToken);

      io.emit("new-user", { user });
    });
  });

  return io;
};

export default initializeSocket;
