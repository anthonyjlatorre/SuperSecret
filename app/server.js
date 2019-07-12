var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require ("socket.io").listen(server);

let users = [];
let connections = [];
let hostConnected = false;
var clients = 0;


server.listen(process.env.PORT || 3000);
console.log("Server running...");

app.get("/", function(req, res){
    res.sendFile(__dirname + "/components/chat-demo/chat-demo.component.html");
});

io.sockets.on("connection", function(socket){
    connections.push(socket);
    console.log("Connected: %s sockets connected", connections.length);
    
    clients++;
   io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});

    // Disconnect
    socket.on("disconnect", function(data) {
        clients--;
        io.sockets.emit('broadcast',{ description: clients + ' clients connected!'})
        users.splice(users.indexOf(socket.username), 1);
        updateUsernames();
        //connections.splice(connections.indexOf(socket), 1);
        connections.pop(socket);
        console.log("Disconnected: %s sockets connected", connections.length);
    });

   // Start game
   socket.on('start_pushed', function(data){
    // console.log(data);
    io.sockets.emit('start_game', "/game");
    });

    // Play Again
    socket.on('back_lobby', function(data){
        // console.log(data);
        io.sockets.emit('back_to_lobby', "/lobby");
        });

    

    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

    function updateUsernames() {
        io.sockets.emit("get users", users);
    }

    socket.on("hello", function(data) {
        console.log(data);
        
    });
});
