const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors")
const {Server} = require("socket.io")
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors:{
        origin:"http://localhost:5173",
        methods: ["GET", "POST"],
    },
})

io.on("connection", (socket) => {
    console.log(socket.io)

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id)
    })
})

server.listen(3001, () => {
    console.log("Server Running on Port: 3001, Client: http://localhost:5173")
})