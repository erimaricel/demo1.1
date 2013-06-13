var records = new Array();
var getHighScoresURL = "http://puzzlepic.cso.ph/rest/apis/pzlpc-apis/getHighScores";
var uploadScoreURL = "http://puzzlepic.cso.ph/rest/apis/pzlpc-apis/uploadScore";

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
            	    var list = "<table align='center'>";
		        	for(i=0; i<records.length; i++){
			        list +="<tr><td align='left'><ul><li>"+(i+1)+".</li></ul></td><td><ul><li>"+records[i][1]+"</li></ul></td><td><ul><li>"+records[i][2]+"pts</li></ul></td>"+"</tr>";
			        }
			        list +="</table>";
			        document.getElementById("inner-content").innerHTML=list;
            	}
          });
     }
     
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