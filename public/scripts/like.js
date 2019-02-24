$(document).ready(function() {
  $(document).on('click','.btn-sm', function() {
    console.log($('.like-count'));
    event.preventDefault()
  });
});