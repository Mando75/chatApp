/**
 * Created by starw on 7/11/2017.
 */
function sendInvite() {
    var name = $('#name').val();
    var email = $('#email').val();
    if(validEmail(email)) {
      $.post('/friends/invite', {
        name: name,
        email: email
      }, function(data, status) {
        $('#head').html(data.header);
        $('#subheader').html(data.subheader);
        $('#message').html(data.message);
        $('#modalInvite').modal('open');
      });
    } else {
      alert("Please enter a valid email");
    }
}

function validEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

