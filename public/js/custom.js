
$(window).on('load', function() {
    //startIntro();
    //silder(),
   // wowanimation();
});





$(function () {


    $('.libuploadbtn').on('click',function(e) {

     // $('.libfileid').click();

    });

     $('.btn-facebook').on('click',function(event) {

    FB.login(function(response) {
        if (response.authResponse) {
         console.log('Welcome!  Fetching your information.... ');
          FB.api('/me?fields=name,email,birthday,first_name,last_name,gender,hometown', function(response) {

    //console.log(response);
    console.log('Good to see you, ' + response.name + '.');
             
      var username   = response.name;
      var email      = response.email;
      var password   = response.id;
      var usertype   = 'fb';
      var birthday   = response.birthday;
      var gender     = response.gender;
      

      var userdata    = {username:username,email:email,inckey:password,usertype:usertype,birthday:birthday,gender:gender}; 

    $.post(base_url+"/api/registerfb",userdata, function(resp){   
      
       

        if(resp.id)
        {   
            sessionStorage.setItem("LLLL", 'LLLL');  

            result = resp;

            sessionStorage.setItem("session_tokenid", result.id);
            sessionStorage.setItem("ses_user_email", result.email);
            sessionStorage.setItem("session_username", result.name);
            sessionStorage.setItem("session_fbid", result.password);
            sessionStorage.setItem("session_usertype", result.user_type);

            document.location.href = base_url+"/login";          

        }
        else
        {
            alert("Please try again");
        }   
    
    });       

         });
        } else {
         console.log('User cancelled login or did not fully authorize.');
        }
    },{
        scope: 'email,user_birthday'
    });

     });


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


