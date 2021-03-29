$(document).ready(function () {
  var header_height = $('.main_nav_wrapper').height();
  var footer_height = $('.footer').height();
  var $main_height = $('div.container.main.content').height();
  var $main_space = $( window ).height() - (header_height + footer_height);
  if($main_height >= $main_space) {
    $('.footer').removeClass('bottom-footer');
  } else {
    $('.footer').addClass('bottom-footer');
  }
}); 