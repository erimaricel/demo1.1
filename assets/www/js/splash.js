var load_once = 0;

function deviceReady() {
	if (load_once == 0) {
		setTimeout(function() {
		$('#splashscreen').fadeOut('slow');
		;},3000);
		load_once = 1;
	}

}
    
function removeSplashScreen() {
	deviceReady();
    //document.addEventListener("deviceready", deviceReady, true);    
}
