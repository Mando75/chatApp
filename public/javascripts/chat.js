/**
 * Created by starw on 6/24/2017.
 */
var messages = [];
window.onload = function() {


  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    var socket = io.connect(window.location.hostname + ':3000');
  } else {
    var socket = io.connect(window.location.hostname);
  }

  var field = document.getElementById("field");
  var sendButton = document.getElementById("send");
  var content = document.getElementById("content");
  var name = user.username;

  socket.on('message', function (data) {
    if(data.message) {
      messages.push(data);
      var html = '';
      for(var i=0; i<messages.length; i++) {
        html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
        html += messages[i].message + '<br />';
      }
      content.innerHTML = html;
      field.value = '';
    } else {
      console.log("There is a problem:", data);
    }
  });

  sendButton.onclick = function() {
    if(!name) {
      alert("Whoops! Something went wrong!!!");
    } else {
      var text = field.value;
      socket.emit('send', { message: text, username: name });
    }
  };

};

$("#field").keyup(function(event){
  if(event.keyCode == 13){
    $("#send").click();
  }
});
