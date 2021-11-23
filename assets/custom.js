$(document).ready(function() {
  var pathname = window.location.pathname;
  if(pathname.includes('pages/nps')) {
    var screen_height = $( window ).height();
    var current_header_footer = $('.nav.clearfix').height() + $('.footer').height();
    var nps_height = $('.container.main.content').height();
    if(screen_height > (current_header_footer + nps_height)) {
      $('.footer').addClass('footer-static');
    }    
  } else {
    if($('.footer').hasClass('footer-static')) {
      $('.footer').removeClass('footer-static');
    }    
  }

  var url = new URL(window.location.href);

  if (url.searchParams.get('msg')) {
    var custom_text = decodeURIComponent(url.searchParams.get('msg'));
    $('.promo_banner__content').html(custom_text);

  }
});

// dinamically update breadcrumb "Products" to collection if set in sessionStorage
// The sessionStorage items are added in collection.liquid template
function updateBreadcrumb() {
  var url = sessionStorage.getItem('collection_url');
  var title = sessionStorage.getItem('collection_title');
  if (url && title) {
    var urlEl = document.getElementById('breadcrumb-collection-url');
    var titleEl = document.getElementById('breadcrumb-collection-title');
    if(urlEl && titleEl) {
      urlEl.href= url;
      titleEl.textContent = title;
    }
  }
}
updateBreadcrumb();

// remove Instantsearch plus(fast simon) autocomplete/search from recharge quick login
jQuery('input[name="verification_code"]').attr('isp_ignore', true);


function adjustAnnouncementBar(){
  if( $(".announcement-bar").length > 0 ){
    $("#header").css('top', $(".announcement-bar").height() + "px");
  }
}



$(document).ready(function(){
  console.log("Adjusting header according to announcement bar...");
  if($(window).width() > 768) {
    adjustAnnouncementBar();

    $(window).resize(() => {
      adjustAnnouncementBar();
    })
  }
});

function updateHeader() {
  if($(window).width() < 768) {
    var position = $(window).scrollTop();
    var promo_banner_height = $('.promo_banner').height();
    var announcement_bar_height = $('.announcement-bar').height();
    if(position > 0) {
      $('.announcement-bar').css({'top': '0px'});
      $('#header').css({'top': announcement_bar_height + 'px'});
    } else {
      var height = Math.abs(position);
      $('.announcement-bar').css({'top': (height + promo_banner_height) + 'px'});
      $('#header').css({'top': (height + promo_banner_height + announcement_bar_height) + 'px'});
    }
  }
}

$(window).on('load scroll', function(){
  updateHeader();
});

