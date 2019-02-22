$(document).ready(function() {
  $('.text-area').on("keyup", function() {
    
    const count = $(this).val().length;
    const maxChar = 140;
    const $counter = $(this).siblings('.counter')
  
    if (count <= maxChar) {
      $counter.text(`${count}/${maxChar}`).css("color", "black");
    } else {
      $counter.text(-($(this).val().substring(maxChar).length)).css("color", "red")
    }
  });
});