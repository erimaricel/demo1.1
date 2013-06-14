

function viewGallery ()
{
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
		function(fileSys) {
            fileSys.root.getDirectory("PuzzlePic", {create:true, exclusive: false},
                function(directory) {
					var directoryReader = directory.createReader();
						directoryReader.readEntries(function(entries) {
							var i;
							for (i=0; i<entries.length; i++) {
								$("#gallery-content").append("<img class='gallery-image'  id='img"+i+"' src='"+entries[i].fullPath+"'/>"); 
							}

						});
                              
                }, resOnError);
       }, resOnError);

	
			
}

function resOnError(error) { 
         console.log("Error:"+error.code); 
} 

