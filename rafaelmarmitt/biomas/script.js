$(document).ready(function(){
    $('#jump').smoothScroll({speed:1500});
    
    $("button").click(function(){
      var target = $(this).attr("href");
      $(".content").not(target).hide();
      $(target).show("slow");
    });
    
    var cw = $('.project').width();
    $('.project').css({'height':cw+'px'});
    
    $("#first").click();
    
  });