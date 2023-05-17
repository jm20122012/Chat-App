import { Server } from "socket.io";

const io = new Server(3000, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connect", (socket) => {
    let userData = {};

    console.log(`New client connected with id: ${socket.id}`);

    // Join client to room when join message received
    socket.on("join", (room) =>  {
        console.log(`Client ID ${socket.id} is joining room ${room}`)
        socket.join(room);
        io.emit("message", `User ${userData.userName} has joined the chat`)
    });

    // Handle client leaving specified room
    socket.on("leave", (room) => {
        console.log(`Client ID ${socket.id} is leaving room ${room}`)
        socket.leave(room)
    });

    //Handle message traffic
    socket.on("message", (data) => {
        console.log(`Received message ${data} - broadcasting to connected clients`)
        let newMsg = `${userData.userName}: ${data}`;
        io.emit("message", newMsg); 
    });

    socket.on("newClient", (data) => {
        console.log("New client with data: ", data);
        console.log("JSON parsed: ", JSON.parse(data));
        userData = JSON.parse(data);
    })

    // Handle client disconnect
    socket.on("disconnect", () => {
        console.log(`Client with id ${socket.id} disconnected`);
    });
})

console.log("Server listening on port 3000");