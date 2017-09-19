$('.login-input').on('focus', function() {
  $('.login').addClass('focused');
});

$('.login').on('submit', function(e) {
  e.preventDefault();
  $('.login').removeClass('focused').addClass('loading');
});

function login() {
  $.ajax({
      url: "/users/login",
      data: { username: $('#username').val(), password: $('#password').val() },
      type: 'POST'
  }).done(function (result) {
      if(result.status === 'success'){
          location.href = '/#/memberData';
      }else if(result.status === 'incorrect password'){
        $('.login').removeClass('loading');
          alert(result.status);
      }else if(result.status === 'incorrect username'){
        $('.login').removeClass('loading');
          alert(result.status);
      }else{
        $('.login').removeClass('loading');
          alert('帳號密碼錯誤');
      }
  });
}