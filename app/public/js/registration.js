$(function() {
  $('.registration-form').submit(function (e) {
    e.preventDefault()
    $.post('/', {
      id: $('.registration-form').attr('userid'),
      name: $('#registration-form-name').val(),
      appleid: $('#registration-form-appleid').val(),
      message: $('#registration-form-message').val()
    }, calllback)
  })

  function calllback (data, status) {
    alert('Registered')
  }
})