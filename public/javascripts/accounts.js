/**
 * Created by starw on 6/21/2017.
 */

$('#getFriends').click(function() {
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
      trow += '<td>' + day.toString().substr(0,15) + '</td>';
      trow += '</tr>';
      console.log(trow);
      $('#tbody').append(trow);
    })
  })
});

$('#close').click(function() {
  $('#tbody').html('');
});