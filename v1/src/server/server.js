import { Server } from "socket.io";

const io = new Server({
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log(`New client connected.  Client ID: ${socket.id}`);

    socket.on("disconnect", () => {
        console.log(`Client ${socket.id} disconnected.`);
    })

    socket.on("clientToServerMsg", (msg) => {
        console.log(`Message from client ${socket.id}: ${msg}`);
        console.log(`Username: ${msg.userName} - Message: ${msg.msg}`);
        io.emit("serverToClientMsg", msg);
    })
});

console.log("Server listening on port 3000...");
io.listen(3000);





