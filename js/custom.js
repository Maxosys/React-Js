
$(window).on('load', function() {
    //startIntro();
    //silder(),
   // wowanimation();
});



$(function () {

     


    $('a[href="#search"]').on('click', function(event) {
        event.preventDefault();
        $('#search').addClass('open');
        $('#search > form > input[type="search"]').focus();
    });

    



    
    $('#search, #search button.close').on('click keyup', function(event) {
        if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
            $(this).removeClass('open');
        }
    });
    
    
    //Do not include! This prevents the form from submitting for DEMO purposes only!
    $('form').submit(function(event) {
        event.preventDefault();
        return false;
    })
});


$(function () {

  $('.opennavediv').on('click', function(event) {
        event.preventDefault();
        document.getElementById("mySidenav").style.width = "320px";
    });
   $('.closenavediv').on('click', function(event) {
        event.preventDefault();
        document.getElementById("mySidenav").style.width = "0";
    });

    /*function openNav() {
     document.getElementById("mySidenav").style.width = "320px";   
    }

    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }*/

});


$(".readmore").on('click touchstart', function(event) {
    var txt = $(".more-content").is(':visible') ? '<i class="fa fa-plus-circle"></i>' : '<i class="fa fa-minus-circle"></i>';
    $(this).parent().prev(".more-content").toggleClass("cg-visible");
    $(this).html(txt);
    event.preventDefault();
});


      $(".mobileuser").click(function () {

    // Set the effect type
    var effect = 'slide';

    // Set the options for the effect type chosen
    var options = { direction: $('.mySelect').val() };

    // Set the duration (default: 400 milliseconds)
    var duration = 500;

    $('#myDiv').toggle(effect, options, duration);
});


 function goBack() {
      window.history.go(-1);
     }


$(document).ready(function(){

    setTimeout(function() {  $("#errormsgdiv").toggle("slow"); }, 5000);
});


