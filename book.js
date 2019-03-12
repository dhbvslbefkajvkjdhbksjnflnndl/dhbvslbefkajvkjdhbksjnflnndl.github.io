var count = 1;
var max = $(".box").length;
var debounce = true;

$( ".nextBtn" ).click(function(e) {
goRight();
});
$( ".backBtn" ).click(function(e) {
goLeft();
});
function scrollDown(){
  $("html, body").animate({ scrollTop: $(document).height() }, 2300);
}

function goRight(){
    width = $('.pageWrap').width();
    var initalLeftMargin = $( ".innerLiner" ).css('margin-left').replace("px", "")*1;
    var newLeftMargin = (initalLeftMargin - width);
    $( ".innerLiner" ).animate({marginLeft: newLeftMargin}, 500);
    count++;
    checkButton();
    changeColor();
    }
function goLeft(){
    width = $('.pageWrap').width();
    var initalLeftMargin = $( ".innerLiner" ).css('margin-left').replace("px", "")*1;
    var newLeftMargin = (initalLeftMargin + width);
    $( ".innerLiner" ).animate({marginLeft: newLeftMargin}, 500);
    count--;
    checkButton();
    changeColor();
}

function checkButton(){
    if(count == 1){
      $( ".backBtn" ).css("opacity", "0");
    }
    else if(count == max){
      $( ".nextBtn" ).css("opacity", "0");
    }
    else{
      $( ".backBtn" ).css("opacity", "1");
      $( ".nextBtn" ).css("opacity", "1");
    }
    document.getElementById("pageNumber").innerHTML = count.toString();
}

function start(){
    checkButton();
}


if($(window).width() < 740){
  $('.box').each(function(){
    var $this = $(this);
    var mc = new Hammer(this);

    mc.on('swiperight', function(){
      if(debounce == true && count != 1){
        debounce = false;
        goLeft();
        setTimeout(function(){ debounce = true; }, 700);
      }
    });

    mc.on('swipeleft', function(){
      if(debounce == true && count != max){
        debounce = false;
        goRight();
        setTimeout(function(){ debounce = true; }, 700);
      }
    });

});
}

function changeColor(){
  var colors = ["pink", "gold", "AliceBlue"];
  $('body').css("background-color", colors[count-1]);
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
