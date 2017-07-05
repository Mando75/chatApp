/**
 * Created by starw on 6/24/2017.
 */

window.onload = function() {


  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    var socket = io.connect(window.location.hostname + ':3000');
  } else {
    var socket = io.connect(window.location.hostname);
  }

  // on connection to server, ask for user's name with an anonymous callback
  socket.on('connect', function(){
    // call the server-side function 'adduser' and send one parameter (value of prompt)
    socket.emit('adduser', user);
  });

  // listener, whenever the server emits 'updatechat', this updates the chat body
  socket.on('updatechat', function (user, data) {
    if(user.user_id){
      $('#content').append('<p><b>'+user.username + ':</b> ' + data + '</p>');
    } else {
      $('#content').append('<p><b>'+user + ':</b> ' + data + '</p>');
    }

  });

  // listener, whenever the server emits 'updateusers', this updates the username list
  socket.on('updateusers', function(users) {
    $('#users').empty();
    console.log(users);
    $.each(users, function(key, value) {
      $('#users').append('<li><a onclick="addFriend()" class="waves-effect" href="#!" id="' + key + '">' +
          '<img src="' + value.avatar + '" class="responsive-img chat-av">' + value.username +
          '<span><i class="status chat-status" id="' + value.user_id + '">' + $("#status option:selected").text() + '</i></span></a></li>');
    });
  });

  // when the client clicks SEND
  $('#send').click( function() {
    var message = $('#field').val();
    $('#field').val('');
    // tell server to execute 'sendchat' and send along one parameter
    socket.emit('sendchat', message);
  });

  // when the client hits ENTER on their keyboard
  $('#field').keypress(function(e) {
    if(e.which == 13) {
      $(this).blur();
      $('#send').focus().click();
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
};

function addFriend() {
  alert('do you want to add as a friend?');
}