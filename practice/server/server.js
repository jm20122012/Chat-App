import { Server } from "socket.io";

const io = new Server(3000, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// handle client connections
io.on("connect", (socket) => {
    console.log(`New client connected with id: ${socket.id}`);

    let clientDetails = {
        userName: "",
        chatRoom: "",
    }
    // Handle room joins
    socket.on("join", (room) => {
        console.log(`Client ${socket.id} is joining room ${room}`);
        socket.join(room);
        clientDetails.chatRoom = room;
    })

    // Handle username definitions
    socket.on("userName", (userName) => {
        console.log(`Setting client ${socket.id} username to ${userName}`);
        clientDetails.userName = userName;
    })

    // Handle room leave
    socket.on("leave", (room) => {
        console.log(`Client ${socket.id} is leaving room ${room}`);
        socket.leave(room);
        clientDetails.chatRoom = "";
    });

    // Handle client disconnects
    socket.on("disconnect", () => {
        console.log(`Client ${socket.id} has disconnected`);
    });

    // Handle broadcasting to connected clients
    socket.on("message", (message) => {
        console.log(`Incoming message from client ${socket.id}: ${message}`);
        let msg = `${clientDetails.userName}: ${message}`;
        
        console.log(`Broadcasting message: ${msg} to room ${clientDetails.chatRoom}`);
        // io.emit("message", msg);
        io.to(clientDetails.chatRoom).emit("message", msg);
    })
})

console.log("Server listening on port 3000...");

