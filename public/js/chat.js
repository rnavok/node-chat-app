var counter = 0;
var scrolled = false;
function updateScroll() {

    var content = $("#content");
    var clientHeight = content.prop('clientHeight');
    var scrollTop = content.prop('scrollTop');
    var scrollHeight = content.prop('scrollHeight');

    var lastMessage = content.children('div:last-child');
    if (clientHeight + scrollTop+lastMessage.innerHeight() + lastMessage.prev().innerHeight()>= scrollHeight){
        content.scrollTop(scrollHeight);
    }

    // if (!scrolled) {
    //     var element = $("#content");
    //     element.scrollTop(document.getElementById("content").scrollHeight);
    // }
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

        locationButton.attr('disabled','disabled')

        navigator.geolocation.getCurrentPosition(function (position)  {            
            socket.emit('newLocationMessage', {
                "coords" : {
                    "lng" : position.coords.longitude,
                    "lat" : position.coords.latitude
            }}, function (echo)  {
                locationButton.removeAttr('disabled')
        });
        }, function (err)  {
            locationButton.removeAttr('disabled')
        })
    });

    audioElement.addEventListener("load", function () {
        audioElement.play();
    }, true);

    socket.on('newMessage', function (data) {
        audioElement.play();
        var d = $('#content');

        
        var template = $('#message-template').html();
        var html = Mustache.render(template,{
            text : data.text,
            messageID : "message_" + counter,
            className : 'otherstextBlob',
            createdAt :  moment().format('HH:MM')
        });

        // var iDiv = document.createElement('div');
        // console.log(d);
        // iDiv.className = 'otherstextBlob';
        // var date  =  moment(data.createdAt);
        // iDiv.innerHTML = `[${date.format('HH:MM')}] ${data.text}</br>`;
       // iDiv.innerHTML = `[${new Date(data.createdAt).toLocaleTimeString()}] ${data.text}</br>`;
        d.append(html);
        updateScroll();
        // d.innerHTML = d.innerHTML  + `[${data.createdAt}]`+  data.text +    "</br>";
    });

    socket.on('locationUpdateMessage', function (locationObj) {
        audioElement.play();
        var d = $('#content');

        
        var template = $('#location-message-template').html();
        var html = Mustache.render(template,{
            text : "My location",
            messageID : "message_" + counter,
            className : 'otherstextBlob',
            createdAt :  moment().format('HH:MM'),
            imgLink : locationObj.imgLink,
            locationLink : locationObj.link
        });



        // var d = $('#content');
        // var iDiv = document.createElement('div');
        // iDiv.className = 'otherstextBlob';
        // var linkAdd = document.createElement('a');
        // linkAdd.setAttribute('href',locationObj.link);
        // var img = document.createElement('img');
        // img.setAttribute("class","img-rounded img-responsive")
        // img.src = locationObj.imgLink;
        // linkAdd.appendChild(img)
        // iDiv.appendChild(linkAdd)
        // iDiv.innerHTML = `[${new Date(data.createdAt).toLocaleTimeString()}] ${data.text}</br>`;
        d.append(html);
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

        // var iDiv = document.createElement('div');
        // iDiv.id = "message_" + counter;
        // iDiv.className = 'mytextBlob';
       
        // iDiv.innerHTML = `[${date.format('HH:MM')}] ${text}</br>`;
        // iDiv.innerHTML = `[${new Date().toLocaleTimeString()}] ${text}</br>`;
        // <span id="v_${iDiv.id}" class="glyphicon glyphicon-ok" aria-hidden="true"></span>
        var date  =  moment().format('HH:MM');
        var template = $('#message-template').html();
        var html = Mustache.render(template,{
            text : text,
            messageID : "message_" + counter,
            className : 'mytextBlob',
            createdAt :  moment().format('HH:MM')
        });


        d.append(html);
        updateScroll();

        socket.emit('createMessage', {
            "from": "ranchi",
            "text": text,
            "messageID": "message_" + counter
        }, function (acno) {
            var d = $('#content');
            var ispan = document.createElement('span');
            // iDiv.id = "message_"+counter;
            ispan.className = 'glyphicon glyphicon-ok';
            ispan.setAttribute("aria-hidden", true);

           $(`#${acno}`).append(ispan);
            //setAttribute("red", "red");
           updateScroll();
        })
    }

});