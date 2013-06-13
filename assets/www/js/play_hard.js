    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value 
    var timeHard = 0; //game timer
    var scoreHard = 0;
    var arr2Hard = [];
    var myintHard;
    var checkwintimerHard;
    var imageData;
    // Wait for Cordova to connect with the device
    //
  
  
    function initHard(){
      document.addEventListener("deviceready",onDeviceReadyHard,false);
    }
  
    // Cordova is ready to be used!
    //
    function onDeviceReadyHard() {
      // navigator.notification.alert("Application Started");
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
        capturePhotoHard();
    }

    function capturePhotoHard() {
    // Take picture using device camera and retrieve image as base64-encoded string
            navigator.camera.getPicture(startHard, onFail,{
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

    function checkwinHard()
    { 

      var z=0;

      $('.placeh').each(function(i, obj) 
          {
               if(this.querySelector("#img"+this.id.substring(6)))
              {
                if(jQuery.inArray(this.id.substring(6), arr2Hard) < 0)
                {
                          arr2Hard.push(this.id.substring(6));
                          scoreHard = scoreHard + (100 + (500/timeHard)); 
                          document.getElementById('pointsh').innerText = parseInt(scoreHard);
                }
              z++;
              }
              else
              {
                z=0;
              }
          });

        if(z == 25)
        {
          clearInterval(myintHard);
          clearInterval(checkwintimerHard);
          moveFileHard();
          displayWinHard();
          return true;
        }
        else
        {
          return false;
        }
    }

    function createRandHard()
    {
      var arr = [];
      for(var x=0;x<=24;x++)
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


    function startHard(imageURI) {
      imageData = imageURI;
      touchinit();
      resetWinHard();
      $('#container').empty();
      clearInterval(myintHard);
      clearInterval(checkwintimerHard);
      timeHard = 0;
      scoreHard = 0;
      document.getElementById('points').innerText = 0;
      document.getElementById('play-timerh').innerText = 0;
      arr2Hard = [];
      
      var y = 0;
      var array = createRandHard();

      for(z=1;z<=25;z++)
      {
          var num = Math.floor(Math.random() * array.length);
          var roll = array.splice(num, 1);
          m = roll;
          $("#playblockh"+z).append("<div id='puzzhard"+z+"' class='puzzhard'></div>");
          $("#puzzhard"+z).append("<img class='img' id='img"+m+"' draggable='false'  style='overflow: hidden;' src='"+imageData+"' width='200px' height='200px'/>");
      }


      for(z=1;z<=25;z++)
      {
        $("#containerHard").append("<div id='placeh"+z+"' class='placeh' style='float:left; border: 1px dotted black; height:40px; width: 40px;'></div>");
          
      }



      $('.puzzhard').draggable({helper: 'clone', revert: true});

      $('.placeh').droppable({
        drop: function (event, ui) {}
      });     

      $('.placeh').on("drop",function(event, ui) {
            if(this.innerHTML.length < 5)
            {
            $(this).empty();
            $(ui.draggable).appendTo(this);
            ui.helper.fadeOut();  
            }
            if(this.querySelector("#img"+this.id.substring(5)))
              {
                if(jQuery.inArray(this.id.substring(6), arr2Hard) < 0)
                {
                          arr2Hard.push(this.id.substring(6));
                          scoreHard = scoreHard + (100 + (500/timeHard)); 
                          document.getElementById('pointsh').innerText = parseInt(scoreHard);
                }
              }
            
              checkwinHard();
          });

      $('.playblock-hard').droppable({
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
      for(var y=1; y<=5; y++)
      {
        for(var x=1; x<=5; x++)
        {     
          document.getElementById('img'+i).style.marginLeft = -(x-1)*40+"px"; 
          document.getElementById('img'+i).style.marginTop = -(y-1)*40+"px"; 
          i++;
        }
      }

      myintHard = window.setInterval(timerHard, 1000);
      checkwintimerHard = window.setInterval(checkwinHard, 100);

    }

    function timerHard()
    {
      document.getElementById('play-timerh').innerText = timeHard++;
      if(timeHard == 500)
      {
        clearInterval(myintHard);
        clearInterval(checkwintimerHard);
        alert("Game Over");
        window.location = "index.html";
      }
    }

// Show end game score 
//
//
function displayWinHard() 
{
  // unhide score block
  //
  $('#score-wrapperh').css('display','block');
  // animate score dialog
  //
  $('#score-wrapperh').animate({
    top: 100, 
    easing: "easein",
  }, 500, function() {
    // Animation complete.
    $({countNum: 1}).animate({countNum: scoreHard+1}, {
      duration: 1000,
      step: function() {
        // What todo on every count
        $('#score-wrapperh span').text(Math.floor(this.countNum));
      },
      complete: function() {
        console.log('finished');
      }
    });
  });
  uploadScores(scoreNormal);
}


// Show end game score 
//
//
function resetWinHard() 
{
  // animate score dialog
  //
  $('#score-wrapperh').animate({
    top: 0, 
    easing: "easein",
  }, 500);
  // unhide score block
  //
  $('#score-wrapperh').css('display','none');
}

function moveFileHard()
{
   window.resolveLocalFileSystemURI(imageData, moveOnSuccessHard, moveOnErrorHard);
}

function moveOnSuccessHard(entry)
{
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
    function(fileSys) 
    {
      fileSys.root.getDirectory("PuzzlePic", {create:true, exclusive: false},
        function(directory) 
        {
          entry.moveTo(directory, null, moveFileSuccessHard, moveOnErrorHard);
        }, moveOnErrorHard);
    }, moveOnErrorHard);
}

function moveOnErrorHard(error)
{
  console.log("Error: "+error.code); 
}

function moveFileSuccessHard(entry)
{
  console.log("New Path: " + entry.fullPath);
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
