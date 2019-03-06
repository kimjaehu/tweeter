$(document).ready(function() {
  $('.text-area').on("keyup", function() {
    
    const count = $(this).val().length;
    const maxChar = 140;
    const $counter = $(this).siblings('span')

    if (count <= maxChar) {
      $counter.text(`${count}/${maxChar}`).removeClass().addClass('counter')
    } else {
      $counter.text(`${count}/${maxChar}`).removeClass().addClass('counter-red')
    }
  });
});