const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname + '/../public');

const port = process.env.PORT || 3000;
var app = express();

var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));


//var  sockets= [];
io.on('connection', ((socket) => {
    console.log('new user connected');
    
    //sockets.push(socket);
    

    socket.on('createMessage', ((data) => {

        data.createdAt = new Date().getTime();
        
        io.emit('newMessage',data)


        // sockets.forEach((item)=>{
        //     if(socket.id !== item.id)
        //     {
        //         item.emit('newMessage',data);                    
        //     }
        }));




    socket.on('disconnect', (() => {
        console.log('user disconnected');
    }));

//    socket.emit('newEmail',{
//        "from" : "rnavok@gmail.com",
//        "to": "UFO"
//    });

}));

app.get('/', function (req, res) {
    res.send('hello');
});

server.listen(port, () => {
    console.log('server is up and running on port' + port);
});