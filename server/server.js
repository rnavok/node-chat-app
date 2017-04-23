const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const validator = require('validator');
const dateformat = require('dateformat');


const publicPath = path.join(__dirname + '/../public');

const port = process.env.PORT || 3000;
var app = express();

var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));


//var  sockets= [];
io.on('connection', ((socket) => {
    console.log('new user connected');

    socket.broadcast.emit('newMessage',{"createdAt" : dateformat(new Date(),"shortTime"),text:"New user added"});
    socket.emit('newMessage',{"createdAt" : dateformat(new Date(),"shortTime"),text:"Welcome to the chat"});
    //sockets.push(socket);
    

    socket.on('createMessage', ((data) => {

        if(!validator.isEmpty(data.text)){
        data.createdAt = dateformat(new Date(),"shortTime")
        
        // io.emit('newMessage',data)
        
        socket.broadcast.emit('newMessage',data)

    }
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