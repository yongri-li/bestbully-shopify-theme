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

  $('.swatch-element').click(function(){
    var qty = $(this).data('qty');
    var current_qty = $('#quantity').val();
    if(current_qty > qty) {
      $('#quantity').val(qty);
      if($('.inventory-message').length > 0) {
        changeMessage($('#quantity'));
      }
    }
  });

  function changeMessage(obj) {
    var inventory_threshold = $('.inventory-message').data('inventory-threshold');

    if(obj.val() >= 0) {
      $('.inventory-message').addClass('active');
    } else {
      $('.inventory-message').removeClass('active');
    }

    if(obj.val() > inventory_threshold) {
      $('.inventory-above').show();
      $('.inventory-below').hide();
    } else {
      $('.inventory-above').hide();
      $('.inventory-below').show();
    }
    
  }

  if($('.inventory-message').length > 0) {
    changeMessage($('#quantity'));
    $('#quantity').change(function(){
      changeMessage($(this));
    });
  }
});

var is_load = false;

function updateHeader() {
  if($(window).width() < 768) {
    var position = $(window).scrollTop();
    var promo_banner_height = $('.promo_banner').height();
    var announcement_bar_height = $('.announcement-bar').height();
    if (position > 0 && position < 50) {
      console.log('none');
      $('.promo_banner').hide();
      $('.announcement-bar').css({'display': 'none'});
      $('#header').css({'display': 'none'});
    }
    else if(position >= 50) {
      console.log('block');
      $('.announcement-bar').css({'display': 'block', 'position':'fixed','top': '0px','margin-top':'-0px'});
      $('#header').css({'display': 'block', 'position':'fixed','top': announcement_bar_height + 'px','margin-top': '0px'});
    } else {
      $('.promo_banner').show();
      $('.announcement-bar').css({'display': 'block', 'position':'fixed','top': '0px','margin-top': promo_banner_height + 'px'});
      $('#header').css({'display': 'block', 'position':'fixed','top': promo_banner_height + announcement_bar_height + 'px','margin-top': '0px'});
    }
  }
}

$(window).on('load scroll', function(){
  updateHeader();
});