$(function () {
  $('.users-list').on('click', function (e) {
    if (e.target.className == 'glyphicon glyphicon-remove') {
      console.log('WILL PROMPT')
      if (confirm('Are you sure you want to delete this?')) {
        $.ajax({
          url: '/users/' + e.target.id,
          type: 'DELETE',
          success: refresh
        }) //ajax
      }
    } // the target is a delete button
}); //feedback messages
  function refresh(data) {
    window.location = '/users'
  }
})
