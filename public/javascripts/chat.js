/**
 * Created by starw on 6/24/2017.
 */
var messages = [];

// $(document).ready(function(){
//   $('#content').animate({
//     scrollTop: $('#content')[0].scrollHeight}, 2000);
// });
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
        html += '<p>';
        html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
        html += messages[i].message;
        html += '</p><br/>';
      }

      content.innerHTML = html;
      field.value = '';
    } else {
      console.log("There is a problem:", data);
    }
  });

  $("#scrollBox").bind("DOMSubtreeModified",function() {
    console.log('scroll');
    // $("#scrollBox").animate({
    //   scrollTop: $("#content")[0].scrollHeight
    // });
    var height = $('#scrollBox')[0].scrollHeight;
    $('#scrollBox').scrollTop(height);
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
