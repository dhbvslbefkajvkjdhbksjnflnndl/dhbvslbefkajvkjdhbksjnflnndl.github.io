var count = 0;
var max = $(".box").length;
var debounce = true;
var scrollDebounce = true;

$( ".nextBtn, .activeTitle, .pieceImg" ).click(function(e) {
  goRight();
});

$( ".backBtn" ).click(function(e) {
  goLeft();
});

$( ".contentsItem" ).click(function(e) {
  contentsClick(this);
});


function scrollDown(){
  $("html, body").animate({ scrollTop: $(document).height() }, 2300);
}

function contentsClick(el) {
    var contentID = $(el).attr("id")[$(el).attr("id").length -1];
    shift = parseInt(contentID) - count;
    scrollDebounce = false;
    width = $('.pageWrap').width() * shift;
    var initalLeftMargin = $( ".innerLiner" ).css('margin-left').replace("px", "")*1;
    var newLeftMargin = (initalLeftMargin - width);
    $( ".innerLiner" ).animate({marginLeft: newLeftMargin}, 500);
    count = contentID;
    changeColor();
    contentsColor();
    checkButton();
    setTimeout(function(){ scrollDebounce = true; }, 600);
    }

function goRight(){
  if(count < max-1 && scrollDebounce == true){
    scrollDebounce = false;
    width = $('.pageWrap').width();
    var initalLeftMargin = $( ".innerLiner" ).css('margin-left').replace("px", "")*1;
    var newLeftMargin = (initalLeftMargin - width);
    $( ".innerLiner" ).animate({marginLeft: newLeftMargin}, 500);
    count++;
    changeColor();
    checkButton();
    contentsColor();
    setTimeout(function(){ scrollDebounce = true; }, 600);
    }
  }
function goLeft(){
    if(count > 0 && scrollDebounce == true){
    scrollDebounce = false;
    width = $('.pageWrap').width();
    var initalLeftMargin = $( ".innerLiner" ).css('margin-left').replace("px", "")*1;
    var newLeftMargin = (initalLeftMargin + width);
    $( ".innerLiner" ).animate({marginLeft: newLeftMargin}, 500);
    count--;
    changeColor();
    checkButton();
    contentsColor();
    setTimeout(function(){ scrollDebounce = true; }, 600);
}
}

function checkButton(){
    $(".backBtn").css("opacity", "1");
    $(".nextBtn").css("opacity", "1");
    $(".nextBtn").removeClass("nextBook");
    $(".nextBtn").addClass("nextBtn");
    if(count == 0){
      $( ".backBtn" ).css("opacity", "0");
    }
    else if(count == max-1){
      setTimeout(function(){
        $(".nextBtn").addClass("nextBook");
        $(".nextBtn").removeClass("nextBtn");
      }, 200);
    }
    // if(count == 0){
    // document.getElementById("pageNumber").innerHTML = " ";
    // }
    // else{
    //   document.getElementById("pageNumber").innerHTML = count.toString();
    // }
}



function start(){
    changeColor();
    checkButton();
    contentsColor();
}


if($(window).width() < 740){
  $('.box').each(function(){
    var $this = $(this);
    var mc = new Hammer(this);

    mc.on('swiperight', function(){
      if(debounce == true && count != 0){
        debounce = false;
        goLeft();
        setTimeout(function(){ debounce = true; }, 700);
      }
    });

    mc.on('swipeleft', function(){
      if(debounce == true && count == max-1){
        debounce = false;
        nextBook();
        setTimeout(function(){ debounce = true; }, 700);
      }
    });

    mc.on('swipeleft', function(){
      if(debounce == true && count != max-1){
        debounce = false;
        goRight();
        setTimeout(function(){ debounce = true; }, 700);
      }
    });

});
}

// function showArrows(){
//   $('#mobileArrows button').show();
// }

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

// function mobileArrows(el) {
//   var windowHeight = jQuery( window ).height();
//   $(el).each(function(){
//       var thisPos = $(this).offset().top;
//       var thisBottom = thisPos + $(this).outerHeight(true);;
//       var topOfWindow = $(window).scrollTop();
//       if (topOfWindow + windowHeight > 200 + thisPos ) {
//         showArrows();
//       }
//       else if (document.body.scrollTop === 0){
//         $('#mobileArrows button').css("display", "none");
//       }
//   });
// }

// $(document).ready(function(){
//     changeColors('.box');
//     if($(window).width() < 730){
//     mobileArrows('.box');
//     }
// });
//
// $(window).scroll(function() {
//   changeColors('.box');
//   if($(window).width() < 730){
//   mobileArrows('.box');
//   }
// });

function contentsColor(){
  $('.contentsItem').css("opacity", "0.4");
  $('#item'+count.toString()).css("opacity", "1");
}

window.onload = start();
