var counter = 0;
var scrolled = false;
function updateScroll() {
    if (!scrolled) {

        var element = $("#content");
        element.scrollTop(document.getElementById("content").scrollHeight);
    }
}

// document.getElementById("content").addEventListener("scroll", function () {scrolled=true;});

bgThing = function (num) {

    switch (num) {
        case 1:
            $('#content').css("background-image", 'url("./../media/img/bg/1.jpg")');
            break;
        case 2:
            $('#content').css("background-image", 'url("./../media/img/bg/2.jpg")');
            break;
        case 3:
            $('#content').css("background-image", 'url("./../media/img/bg/3.jpg")');
            break;
        case 4:
            $('#content').css("background-image", 'url("./../media/img/bg/4.jpg")');
            break;
        case 5:
            $('#content').css("background-image", 'url("./../media/img/bg/5.jpg")');
            break;
        default:
            $('#content').css("background-image", 'url("./../media/img/bg/1.jpg")');
            break;
    }
}



$('#messageForm').submit(function (e) {
    e.preventDefault();
    addTextLine();
});

var socket = io();
socket.on('connect', function () {
    console.log('connected to server');


});

socket.on('disconnect', function () {
    console.log('disconnected from server');
});




$(document).ready(function () {

    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', './../media/sounds/newMessage/surprise-on-a-spring.mp3');
    audioElement.setAttribute('autoplay:false', 'autoplay');
    //audioElement.load code above. if you take out :false from the code the file will auto play than everythin works the same after that()
    $.get();


    var locationButton = $("#locationButton");
    
    locationButton.on('click', (e) => {
        if (!navigator.geolocation) {
            return alert("your browser ");
        }

        navigator.geolocation.getCurrentPosition(function (position)  {            
            socket.emit('newLocationMessage', {
                "coords" : {
                    "lng" : position.coords.longitude,
                    "lat" : position.coords.latitude
            }                
        }, function (err)  {
            alert('unable to fatch location');
        })
        })
    });

    audioElement.addEventListener("load", function () {
        audioElement.play();
    }, true);

    socket.on('newMessage', function (data) {
        audioElement.play();
        var d = $('#content');
        var iDiv = document.createElement('div');
        console.log(d);
        iDiv.className = 'otherstextBlob';
        iDiv.innerHTML = `[${new Date(data.createdAt).toLocaleTimeString()}] ${data.text}</br>`;
        d.append(iDiv);
        updateScroll();
        // d.innerHTML = d.innerHTML  + `[${data.createdAt}]`+  data.text +    "</br>";
    });

    socket.on('locationUpdateMessage', function (locationObj) {
        console.log(locationObj);
        audioElement.play();
        var d = $('#content');
        var iDiv = document.createElement('div');
        iDiv.className = 'otherstextBlob';
        var img = document.createElement('img');
        img.setAttribute("class","img-rounded img-responsive")
        img.src = locationObj.imgLink;
        iDiv.appendChild(img)
        // iDiv.innerHTML = `[${new Date(data.createdAt).toLocaleTimeString()}] ${data.text}</br>`;
        d.append(iDiv);
        updateScroll();
    });

    var wage = document.getElementById("inputLine");
    wage.addEventListener("keydown", function (e) {
        if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
            addTextLine();
        }
    });



    addTextLine = function () {

        counter++;
        var inp = $('#inputLine');

        var text = inp.val();
        console.log(text);
        inp.val('');


        if (text === "")
            return;
        var d = $('#content');
        // d.appendChild(`<div class="mystextBlob">[${new Date().getTime()} ${text}] </div>`);

        var iDiv = document.createElement('div');
        iDiv.id = "message_" + counter;
        iDiv.className = 'mytextBlob';
        iDiv.innerHTML = `[${new Date().toLocaleTimeString()}] ${text}</br>`;

        // <span id="v_${iDiv.id}" class="glyphicon glyphicon-ok" aria-hidden="true"></span>
        d.append(iDiv);
        updateScroll();

        socket.emit('createMessage', {
            "from": "ranchi",
            "text": text,
            "messageID": iDiv.id
        }, function (acno) {
            var d = $('#content');
            var ispan = document.createElement('span');
            // iDiv.id = "message_"+counter;
            ispan.className = 'glyphicon glyphicon-ok';
            ispan.setAttribute("aria-hidden", true);

            $(`#${acno}`).append(ispan);
            // setAttribute("red", "red");
        })
    }

});