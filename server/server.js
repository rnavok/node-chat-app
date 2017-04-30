const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const validator = require('validator');
const dateformat = require('dateformat');
var { generateMessage, generateLocationMessage } = require('./util/message')

const publicPath = path.join(__dirname + '/../public');

const port = process.env.PORT || 3000;
var app = express();

var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));


//var  sockets= [];
io.on('connection', ((socket) => {
    console.log('new user connected');

    socket.broadcast.emit('newMessage', generateMessage("admin", "New user joined the chat"));
    socket.emit('newMessage', { "createdAt": new Date().toISOString(), text: "Welcome to the chat" });
    //sockets.push(socket);


    socket.on('createMessage', ((data, callback) => {

        if (!validator.isEmpty(data.text)) {
            data.createdAt = dateformat(new Date(), "shortTime")

            // io.emit('newMessage',data)

            socket.broadcast.emit('newMessage', generateMessage(data.from, data.text));
            
            callback(data.messageID);
            // setTimeout(function() {
            //     callback(data.messageID);
            // }, 3000);


        }
        // sockets.forEach((item)=>{
        //     if(socket.id !== item.id)
        //     {
        //         item.emit('newMessage',data);                    
        //     }
    }));

    socket.on('newLocationMessage', (coords,callback) => {
        

        if (! (null == coords)) {

            // data.createdAt = dateformat(new Date(), "shortTime")

            // io.emit('newMessage',data)

            socket.broadcast.emit('locationUpdateMessage', generateLocationMessage(coords));
           
        }
         callback('ok');
    });


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