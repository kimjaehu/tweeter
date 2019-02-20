// function charCounter(string) {

//   let maxChar = 10;
//   let count = string.length;

//   if (count < maxChar) {
//     document.getElementsByClassName("counter")[0].innerText = `${count}/${maxChar}`;
//   } else if (count === maxChar) {
//     document.getElementsByClassName("counter")[0].innerText = "max";
//   } else {
//     string = string.substring(0, maxChar);
//     document.getElementsByClassName("text-area")[0].value = string;
//     // console.log(`element value: ${document.getElementsByClassName("text-area")[0].value}, string: ${string}`)
//   }
// }

$(document).ready(function() {
  // --- our code goes here ---
  $('.text-area').on("keyup", function() {
    
    const count = $(this).val().length;
    const maxChar = 140;
    const $counter = $(this).siblings('.counter')
  
    if (count <= maxChar) {
      $counter.text(`${count}/${maxChar}`).css("color", "black");
    // } else if (count === maxChar) {
    //   $counter.text("max");
    } else {
      $counter.text(-($(this).val().substring(maxChar).length)).css("color", "red")
      // console.log($(this).val().substring(maxChar))
    }
  });
});