/**
 * Created by starw on 6/21/2017.
 */

/**
 * Function to generate a table of friends
 */
function getFriends () {
  $('#tbody').html('');
  console.log('getting Friends!');
  $.get('/friends/getFriends', function(data, status) {
    var rows = data;
    $.each(rows, function(i, v) {
      var trow = '<tr>';
      if(v.avatar) {
        trow += '<td><div style="background-image: url(' + v.avatar +  ')" class="favatar"></div></td>';
      } else {
        trow += '<td><i class="material-icons">account_circle</i></td>'
      }
      trow += '<td>' + v.username +'</td>';
      trow += '<td>' + v.status + '</td>';
      var ds= v.last_login;
      var day= new Date(ds.replace(' ','T')+'Z');
      day.toUTCString();
      trow += '<td>' + day.toString().substr(0,15) + '</td><td class="center"><a href="#!" onclick="removeFriend('+  v.rel_id + ')"><i class="material-icons grey-text">remove_circle_outline</i></a></td>';
      trow += '</tr>';
      $('#tbody').append(trow);
    })
  })
}

$('#getFriendsNav').click(getFriends);


/**
 * a function to remove a friend
 */
function removeFriend(rel_id) {
  if(rel_id) {
    $.post('friends/removeFriend', {
      rel_id: rel_id
    }, function (data, status) {
      // console.log(data);
      getFriends();
    });
  }
}

/**
 * A function to update the avatar
 */
function upAvatar (){
  var newavatar = $('#new_avatar').val();
  if(newavatar){
  $.post('/account/upAvatar', {
      new_avatar: newavatar
    }, function (response, status) {
      console.log(response);
      var avatars = $('.avatar-img');
      $.each(avatars, function(i, v){
        v.setAttribute('src', response.avatar);
      });
    Materialize.toast(response.message, 4000);
    });
  }
}

/**
 * A functino to update the username
 */
function upUsername() {
  var newusername = $('#new_username').val();
  if(newusername) {
    $.post('/account/upUsername', {
      new_username: newusername
    }, function(response, status) {
      console.log(response);
      Materialize.toast(response.message, 4000);
      var names = $('.name');
      $.each(names, function(i,v){
        v.innerHTML = response.username;
      });
    })
  }
}

/**
 * a function to update the email
 */
function upEmail() {
  var newemail = $('#new_email').val();
  console.log(newemail);
  if(newemail) {
    $.post('/account/upEmail', {
      new_email: newemail
    }, function(res, status) {
      Materialize.toast(res.message, 4000);
      console.log(res);
      var emails = $('.email');
      $.each(emails, function(i,v){
        v.innerHTML = res.email;
      });
    });
  } else {
    console.log('err')
  }
}

/**
 * a function to update user's password
 */
function upPwd() {
  var oldPwd = $('#old_pwd').val();
  var newPwd = $('#new_pwd').val();
  var confirmPwd = $('#confirm_pwd').val();
  if(oldPwd && newPwd && confirmPwd) {
    console.log(oldPwd, newPwd, confirmPwd);
    $.post('/account/upPwd', {
      old_pwd : oldPwd,
      new_pwd : newPwd,
      confirm_pwd : confirmPwd
    }, function(res, status) {
      console.log(res);
      Materialize.toast(res.message, 4000);
    });
  } else {
    Materialize.toast("Please fill in all the fields",4000);
  }
}

/**
 * function to update user status
 */
function upStatus() {
  var status = $('#status').val();
  if(status) {
    $.post('/account/updateStatus', {
      new_status: status
    }, function(res, status) {
      console.log(res);
      // $('#' + user.user_id).html($("#status option:selected").text());
      Materialize.toast(res.message, 4000)
    })
  }

}

/**
 * A function to create an account
 */
function createAccount() {
  var username = $('#username').val();
  var email = $('#email').val();
  var pwd = $('#password').val();
  var confirmPwd = $('#password').val();
  if(username, email, pwd, confirmPwd) {
    $.post('/account/createAccount', {
      username: username,
      email: email,
      password: pwd,
      confirmPwd: confirmPwd
    }, function(res, status) {
      $('#header').html(res.header);
      $('#subheader').html(res.subheader);
      $('#message').html(res.message);
      $('#link').attr('href', res.link);
    });

  }
}

