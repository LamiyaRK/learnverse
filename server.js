// server.js
import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";
import dbConnect from "./src/lib/dbConnect.js";

const app = next({ dev: true });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => handle(req, res));

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3001",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", async (socket) => {
    console.log("Socket connected:", socket.id);

    const messagesCollection = dbConnect("messages");

    // Load previous messages
    try {
      const messages = await messagesCollection.find().sort({ createdAt: 1 }).toArray();
      socket.emit("loadMessages", messages);
    } catch (err) {
      console.error("Error loading messages:", err);
    }

    // Listen for new messages
    socket.on("sendMessage", async (msg) => {
      try {
        const messageWithMeta = {
          sender: {
            name: msg.sender.name,
            image: msg.sender.image || null,
          },
          message: msg.message,
          createdAt: new Date(),
        };
        await messagesCollection.insertOne(messageWithMeta);

        // Broadcast to all clients
        io.emit("receiveMessage", messageWithMeta);
      } catch (err) {
        console.error("Error sending message:", err);
      }
    });
  });

  server.listen(3000, () => {
    console.log("Socket server running on http://localhost:3000");
  });
});
