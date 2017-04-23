var socket = io();
socket.on('connect', function () {
    console.log('connected to server');

  
})

socket.on('disconnect', function () {    
    console.log('disconnected from server');
})

// socket.on('newEmail', function (data) {    
//     console.log('new email',data);
// })

socket.on('newMessage', function (data) {    
    console.log('new message:',data);
    var d = document.getElementById('content')
    d.innerHTML = d.innerHTML  + `[${data.createdAt}]   `+  data.text    + "</br>";
})


 dodo = function(){
      var d = document.getElementById('inputLine');
      var text = d.value;
      d.value = "";

      socket.emit('createMessage',{              
        "from" : "ranchi",
        "text" : text
    })
}