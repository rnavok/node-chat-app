$('#loginForm').submit(function (e) {
    e.preventDefault();
console.log('in');
    var email = $("#inputEmail").val();
    var password = $("#inputPassword").val();

var data = JSON.stringify({password,email});

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://localhost:3000/users",
  "method": "POST",
  "headers": {
    "content-type": "application/json",
    "cache-control": "no-cache",
  },
  "processData": false, 
  "data" : data
}

$.ajax(settings).done(function (response) {
  window.location.replace(response);
}).fail(function(err) {
   var alertM =  $("<div>bad loging , try again</div>");
   alertM.attr("class","alert alert-danger");
   alertM.attr("role","alert");

   $("#messages").append(alertM);
    $('#myModal').modal('hide');

});



// var settings = {
//   "async": true,
//   "crossDomain": true,
//   "url": "http://localhost:3000/users",
//   "method": "POST",
//   "headers": {
//     "content-type": "application/json",
//     "cache-control": "no-cache",
//   },
//   "processData": false,
//   "data": "{'email': email, 'password' :password }"
// }

// $.ajax(settings).done(function (data,textStatus) {
//      console.log(response);
// }).fail((err)=>{
//      alert(errMsg);
// });
  
});