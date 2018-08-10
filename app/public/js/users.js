$(function () {
  $('.users-list').on('click', function (e) {
    if (e.target.className == 'glyphicon glyphicon-remove') {
      if (confirm('Are you sure you want to delete this?')) {
        $.ajax({
          url: '/users/' + e.target.id,
          type: 'DELETE',
          success: removeCallback
        }) //ajax
      }
    } // the target is a delete button
    else if (e.target.className == 'glyphicon glyphicon-pencil') {
        window.location = '/edit/' + e.target.id
      }
}); //feedback messages

  function removeCallback(data) {
    window.location = '/users'
  }

  function editCallback(data) {
    window.location = '/users'
  }
})
