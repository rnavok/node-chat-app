var scrolled = false;
function updateScroll(){
    if(!scrolled){
        var element = document.getElementById("content");
        element.scrollTop = element.scrollHeight;
    }
}

// document.getElementById("content").addEventListener("scroll", function () {scrolled=true;});


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
    var d = document.getElementById('content');
    var iDiv = document.createElement('div');
    
    iDiv.className = 'otherstextBlob';
    iDiv.innerHTML= `[${data.createdAt}] ${data.text}</br>`;
    d.appendChild(iDiv);
    updateScroll();
    // d.innerHTML = d.innerHTML  + `[${data.createdAt}]`+  data.text +    "</br>";
})

var wage = document.getElementById("inputLine");
wage.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
      dodo();
    }
});



 dodo = function(){

      var inp = document.getElementById('inputLine');
      var text = inp.value;      
      inp.value = '';

      if (text=== "")
        return ;
    var d = document.getElementById('content');
   // d.appendChild(`<div class="mystextBlob">[${new Date().getTime()} ${text}] </div>`);
    
    var iDiv = document.createElement('div');
    
    iDiv.className = 'mytextBlob';
    iDiv.innerHTML= `[${new Date().getHours()}:${new Date().getMinutes()}] ${text}`;
    d.appendChild(iDiv);
    updateScroll();
      
      socket.emit('createMessage',{              
        "from" : "ranchi",
        "text" : text
    })
}