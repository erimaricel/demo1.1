    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value 
    var timeNormal = 0; //game timer
    var scoreNormal = 0;
    var arr2Normal = [];
    var myintNormal;
    var checkwintimerNormal;
    // Wait for Cordova to connect with the device
    //

    touchRemove();
  

    $('#playnormal').live('pageshow',function(event, ui){
    $('#container').empty();
     initNormal();
    });

    function initNormal(){
      document.addEventListener("deviceready",onDeviceReadyNormal,false);
    }
  
    // Cordova is ready to be used!
    //
    function onDeviceReadyNormal() {
      // navigator.notification.alert("Application Started");
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
        capturePhotoNormal();
    }

    function capturePhotoNormal() {
    // Take picture using device camera and retrieve image as base64-encoded string
            navigator.camera.getPicture(startNormal, onFail,{
            quality : 75, 
            destinationType : Camera.DestinationType.FILE_URI, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 200,
            targetHeight: 200,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true });         
   }


    // A button will call this function
    //
    function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    // Called if something bad happens.
    // 
    function onFail(message) {
      alert('Failed because: ' + message);
      window.location = "index.html";
    }



    function touchHandler(event)
    {
      var touches = event.changedTouches,
      first = touches[0],
      type = "";
      switch(event.type)
      {
        case "touchstart": type="mousedown"; break;
        case "touchmove":  type="mousemove"; break;        
        case "touchend":   type="mouseup"; break;
        default: return;
      }
      var simulatedEvent = document.createEvent("MouseEvent");
       simulatedEvent.initMouseEvent(type, true, true, window, 1,
                          first.screenX, first.screenY,
                          first.clientX, first.clientY, false,
                          false, false, false, 0/*left*/, null);
      first.target.dispatchEvent(simulatedEvent); 
      event.preventDefault();
    }

    function checkwinNormal()
    { 

      var z=0;

      $('.place').each(function(i, obj) 
          {
               if(this.querySelector("#img"+this.id.substring(5)))
              {
                if(jQuery.inArray(this.id.substring(5), arr2Normal) < 0)
                {
                          arr2Normal.push(this.id.substring(5));
                          scoreNormal = scoreNormal + (100 + (500/timeNormal)); 
                          document.getElementById('points').innerText = parseInt(scoreNormal);
                }
              z++;
              }
              else
              {
                z=0;
              }
          });

        if(z == 16)
        {
          clearInterval(myintNormal);
          clearInterval(checkwintimerNormal);
          touchRemove();
          moveFileNormal();
          displayWinNormal();
          return true;
        }
        else
        {
          return false;
        }
    }

    function createRandNormal()
    {
      var arr = [];
      for(var x=0;x<=15;x++)
      {
        arr[x] = x+1;
      }

      return arr;
    }

    function touchinit()
    {
      document.addEventListener("touchstart", touchHandler, true);
      document.addEventListener("touchmove", touchHandler, true);
      document.addEventListener("touchend", touchHandler, true);
      document.addEventListener("touchcancel", touchHandler, true);
    }

    function touchRemove()
    {
      document.removeEventListener("touchstart", touchHandler, true);
      document.removeEventListener("touchmove", touchHandler, true);
      document.removeEventListener("touchend", touchHandler, true);
      document.removeEventListener("touchcancel", touchHandler, true);
    }


    function startNormal(imageData) {

      touchinit();
      resetWinNormal();
      $('#container').empty();
      clearInterval(myintNormal);
      clearInterval(checkwintimerNormal);
      timeNormal = 0;
      scoreNormal = 0;
      document.getElementById('points').innerText = 0;
      document.getElementById('play-timer').innerText = 0;
      arr2Normal = [];
      
      var y = 0;
      var array = createRandNormal();

      for(z=1;z<=16;z++)
      {
          var num = Math.floor(Math.random() * array.length);
          var roll = array.splice(num, 1);
          m = roll;
          $("#playblock"+z).append("<div id='puzz"+z+"' class='puzz'></div>");
          $("#puzz"+z).append("<img class='img' id='img"+m+"' draggable='false'  style='overflow: hidden;' src='"+imageData+"' width='200px' height='200px'/>");
      }


      for(z=1;z<=16;z++)
      {
        $("#container").append("<div id='place"+z+"' class='place' style='float:left; border: 1px dotted black; height:50px; width: 50px;'></div>");          
      }



       $('.puzz').draggable({helper: 'clone', revert: true});

      $('.place').droppable({
        drop: function (event, ui) {}
      });     

      $('.place').on("drop",function(event, ui) {
            if(this.innerHTML.length < 5)
            {
            $(this).empty();
            $(ui.draggable).appendTo(this);
            ui.helper.fadeOut();  
            }

            if(this.querySelector("#img"+this.id.substring(5)))
              {
                if(jQuery.inArray(this.id.substring(5), arr2Normal) < 0)
                {
                          arr2Normal.push(this.id.substring(5));
                          scoreNormal = scoreNormal + (100 + (500/timeNormal)); 
                          document.getElementById('points').innerText = parseInt(scoreNormal);
                }
              }
            
              checkwinNormal();
          });

      $('.playblock-normal').droppable({
        drop: function (event, ui) {
            if(this.innerHTML.length < 5)
            {
            $(this).empty();
            $(ui.draggable).appendTo(this);
            ui.helper.fadeOut();
            }
        }
      });  

      var i = 1;
      for(var y=1; y<=4; y++)
      {
        for(var x=1; x<=4; x++)
        {     
          document.getElementById('img'+i).style.marginLeft = -(x-1)*50+"px"; 
          document.getElementById('img'+i).style.marginTop = -(y-1)*50+"px"; 
          i++;
        }
      }

      myintNormal = window.setInterval(timerNormal, 1000);
      checkwintimerNormal = window.setInterval(checkwinNormal, 100);

    }

    function timerNormal()
    {
      document.getElementById('play-timer').innerText = timeNormal++;
      if(timeNormal == 500)
      {
        clearInterval(myintNormal);
        clearInterval(checkwintimerNormal);
        alert("Game Over");
        window.location = "index.html";
      }
    }

// Show end game score 
//
//
function displayWinNormal() 
{
  // unhide score block
  //
  $('#score-wrapper').css('display','block');
  // animate score dialog
  //
  $('#score-wrapper').animate({
    top: 100, 
    easing: "easein",
  }, 500, function() {
    // Animation complete.
    $({countNum: 1}).animate({countNum: scoreNormal}, {
      duration: 1000,
      step: function() {
        // What todo on every count
        $('#score-wrapper span').text(Math.floor(this.countNum));
      },
      complete: function() {
        console.log('finished');
      }
    });
  });
  uploadScores(Math.round( scoreNormal ));
}


// Show end game score 
//
//
function resetWinNormal() 
{
  // animate score dialog
  //
  $('#score-wrapper').animate({
    top: 0, 
    easing: "easein",
  }, 500);
  // unhide score block
  //
  $('#score-wrapper').css('display','none');
}


// Upload Score

var uploadScoreURL = "http://puzzlepic.cso.ph/rest/apis/pzlpc-apis/uploadScore";

 function uploadScores(score){ 
  var username = prompt("Enter name:");
  var finalScore = score.toString()+"";
  if(username!=null){
	 $.ajax({
		url: uploadScoreURL,
		type: 'POST',
		dataType: 'json',
		data: 'userName='+username+'&gameScore='+finalScore,
		success: function (data) {
		  getHighScores();
		}
	});
  }
 }
 
 
var records = new Array();
var getHighScoresURL = "http://puzzlepic.cso.ph/rest/apis/pzlpc-apis/getHighScores";
 function getHighScores(){ 
	  $.ajax({ 
		type: "GET",
		  dataType: "json",
		 url: getHighScoresURL,
		  success: function(data) {
				$.each(data, function(i, item) {
					records[i]=new Array();
					records[i][0]=item.recordID;
					records[i][1]=item.userName;
					records[i][2]=item.gameScore;
				});            	   
				var list = "<table align='center' width = '80%'>";
				for(i=0; i<records.length; i++){
				list +="<tr><td align='left'><ul><li>"+(i+1)+".</li></ul></td><td><ul><li>"+records[i][1]+"</li></ul></td><td><ul><li>"+records[i][2]+"pts</li></ul></td>"+"</tr>";
				}
				list +="</table>";
				document.getElementById("inner-content").innerHTML=list;
			}
	  });
 }

  function moveFileNormal()
  {
      window.resolveLocalFileSystemURI(imageData, moveFileSuccessNormal, resOnErrorNormal);
  }

  function moveFileSuccessNormal(entry)
  {
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
          function(fileSys)
          {
              fileSys.root.getDirectory("PuzzlePic", {create:true, exclusive: false},
                    function(directory) 
                    {
                      entry.moveTo(directory, null, moveSuccess, resOnErrorNormal);
                    }, resOnError);
          }, resOnErrorNormal);
  }

  function moveSuccess(entry){
      console.log("New Path: " +entry.fullPath);

  }

  function resOnErrorNormal(error){
    console.log("Error: " +error.code)
  }