var count = 0;
var max = $(".box").length;
var debounce = true;
var scrollDebounce = true;

$( ".nextBtn" ).click(function(e) {
  $('.fadeout').hide();
  goRight();
});

$( ".activeTitle" ).click(function(e) {
  $('.fadeout').hide();
  goRight();
});

$( ".backBtn" ).click(function(e) {
  $('.fadeout').hide();
  goLeft();
});

function scrollDown(){
  $("html, body").animate({ scrollTop: $(document).height() }, 2300);
}

function goRight(){
    count++;
    setTimeout(function(){ changeColor(); }, 0);
    width = $('.pageWrap').width();
    var initalLeftMargin = $( ".innerLiner" ).css('margin-left').replace("px", "")*1;
    var newLeftMargin = (initalLeftMargin - width);
    $( ".innerLiner" ).animate({marginLeft: newLeftMargin}, 500);
    checkButton();
    }
function goLeft(){
    count--;
    setTimeout(function(){ changeColor(); }, 0);
    width = $('.pageWrap').width();
    var initalLeftMargin = $( ".innerLiner" ).css('margin-left').replace("px", "")*1;
    var newLeftMargin = (initalLeftMargin + width);
    $( ".innerLiner" ).animate({marginLeft: newLeftMargin}, 500);
    checkButton();
}

function checkButton(){
    if(count == 0){
      $( ".backBtn" ).css("opacity", "0");
    }
    else if(count == max-1){
      $( ".nextBtn" ).css("opacity", "0");
    }
    else{
      $( ".backBtn" ).css("opacity", "1");
      $( ".nextBtn" ).css("opacity", "1");
    }
    if(count == 0){
    document.getElementById("pageNumber").innerHTML = " ";
    }
    else{
      document.getElementById("pageNumber").innerHTML = count.toString();
    }
}

function showAll(){
  $('.pageWrap').fadeTo(100,1);
}

function start(){
    showAll();
    checkButton();
    $('.fadeout').show();
}


if($(window).width() < 740){
  $('.box').each(function(){
    var $this = $(this);
    var mc = new Hammer(this);

    mc.on('swiperight', function(){
      if(debounce == true && count != 0){
        debounce = false;
        $('.fadeout').hide();
        goLeft();
        setTimeout(function(){ debounce = true; }, 700);
      }
    });

    mc.on('swipeleft', function(){
      if(debounce == true && count != max-1){
        debounce = false;
        $('.fadeout').hide();
        goRight();
        setTimeout(function(){ debounce = true; }, 700);
      }
    });

});
}

function showArrows(){
  $('#mobileArrows button').show();
}

function changeColors(el) {
  var windowHeight = jQuery( window ).height();
  $(el).each(function(){
      var thisPos = $(this).offset().top;
      var thisBottom = thisPos + $(this).outerHeight(true);;
      var topOfWindow = $(window).scrollTop();
      if (topOfWindow + windowHeight > 200 + thisPos ) {
        changeColor();
      }
  });
}

function mobileArrows(el) {
  var windowHeight = jQuery( window ).height();
  $(el).each(function(){
      var thisPos = $(this).offset().top;
      var thisBottom = thisPos + $(this).outerHeight(true);;
      var topOfWindow = $(window).scrollTop();
      if (topOfWindow + windowHeight > 200 + thisPos ) {
        showArrows();
      }
      else if (document.body.scrollTop === 0){
        $('#mobileArrows button').css("display", "none");
      }
  });
}

$(document).ready(function(){
    changeColors('.box');
    if($(window).width() < 730){
    mobileArrows('.box');
    }
});

$(window).scroll(function() {
  changeColors('.box');
  if($(window).width() < 730){
  mobileArrows('.box');
  }
});



window.onload = start();
