
/*
 *	Available background image sizes.
 *
 *  narrow: 480
 *  medium: 800
 *  wide: 1280  
 *

// adjust background image
function initializeLayout(){	
	document.addEventListener('touchmove', function(e){ e.preventDefault(); }, false);
	$('body').css('background-size','auto '+window.screen.availHeight+'px');
	$('body').css('height',window.screen.availHeight+'px');
	//adjust heigh on landscape mode
	if (window.screen.availWidth > window.screen.availHeight) {
		$('#logo').css('margin-bottom','10%');
	} else {
		$('#logo').css('margin-bottom','30%');
	}
}


function check phone or tablet resolution

function checkResolution() {	
    width = parseInt(window.screen.availWidth);
    height = parseInt(window.screen.availHeight);

    // for portrait
    if (height > width) {
	    if (width < 701) {
	        // phone code
	    }  else {
	       // tablet code
	    }
	} else {
	// for landscape
	    if (height < 701) {
	        // phone code
	    } else {
	       // tablet code
	    }
	}
}

$(document).ready(function() {
	
	initializeLayout();
	$(window).resize(function () 
    {
		initializeLayout(window.screen.availHeight);
    });

});
 */

function initLayout() {
    width = parseInt(window.screen.availWidth);
    height = parseInt(window.screen.availHeight);
    // for portrait
    if (height > width) {
	    if (width < 701) {
	        $("#size-stylesheet").attr("href", "css/narrow.css");
	    } else if ((width >= 701) && (width < 900)) {
	        $("#size-stylesheet").attr("href", "css/medium.css");
	    } else {
	       $("#size-stylesheet").attr("href", "css/wide.css"); 
	    }
	} else {
	// for landscape
	    if (height < 701) {
	        $("#size-stylesheet").attr("href", "css/narrow-landscape.css");
	    } else if ((height >= 701) && (height < 900)) {
	        $("#size-stylesheet").attr("href", "css/medium-landscape.css");
	    } else {
	       $("#size-stylesheet").attr("href", "css/wide-landscape.css"); 
	    }
	}
	$('.wrapper').css('background-size','auto '+window.screen.availHeight+'px');
}

$(function() {
	
	$( document ).bind( "mobileinit", function() {
		    // Make your jQuery Mobile framework configuration changes here!

		    $.mobile.allowCrossDomainPages = true;
		});

	
	document.addEventListener('touchmove', function(e){ e.preventDefault(); }, false);
	
    initLayout();
    $(window).resize(function() {
        initLayout();
    });
});


