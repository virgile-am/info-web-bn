import http from "http";

import { Server } from "socket.io";
import cors from "cors";
import { connectDB } from "./app.js";
import app from "./app.js";

const { PORT } = process.env;

app.use(cors());

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("customEvent", (data) => {
    console.log("Custom event received:", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const startServer = async () => {
  try {
    await connectDB();

    server.listen(PORT, () => {
      console.log(`🍏 Server is running on: http://localhost:${PORT} ... 🌊`);
    });
  } catch (err) {
    console.error(`❌ Error starting the server: ${err}`);
    process.exit(1);
  }
};

startServer();
