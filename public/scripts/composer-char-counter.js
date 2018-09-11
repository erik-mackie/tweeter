// count characters in text area and update display counter
$(function() {
  $(".textContainer textarea").keyup(function() {
    let charCount = this.value.length ;
    /*$('.counter').text(140 - charCount);*/
    $(this).parent().siblings('span').text(140 - charCount);
    if (charCount > 140) {
       $(this).parent().siblings('span').css('color', 'red');
    }
  });
});


//maxlength attribute in textarea form?