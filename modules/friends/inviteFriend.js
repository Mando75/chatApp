/**
 * Created by starw on 7/11/2017.
 */
let ejs = require('ejs');
function inviteFriend(invite, callback) {
  const sendgrid_api_key = process.env.SENDGRID_API_KEY || require('../modules/sendgridkey');

  // construct the message

  let header = '<h1>Hi ' + invite.name + '</h1><h4>' + invite.user + ' has invited you to join Material Chat</h4>';
  let message = '<p>Material Chat lets you quickly connect and talk with friends.</p><a href="http://chat-material.herokuapp.com/account/createAccount" role="button">Sign Up Today!</a>';


  let helper = require('sendgrid').mail;
  let fromEmail = new helper.Email('noreply@chat-material.com');
  let toEmail = new helper.Email(invite.email);
  let subject = 'Invitation from ' + invite.user;
  let content = new helper.Content('text/html',header + message);
  let mail = new helper.Mail(fromEmail, subject, toEmail, content);

  let sg = require('sendgrid')(sendgrid_api_key);
  let request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  sg.API(request, function (error, response) {
    if (error) {
      console.log('Error response received');
      console.log(response.statusCode);
      console.log(response.body);
      callback(new Error('Error sending email'));
    }
    // console.log(response.headers);
    console.log(response);
    callback(null);
  });
}

module.exports = inviteFriend;
