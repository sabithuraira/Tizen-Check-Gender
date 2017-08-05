(function() {
	function setGender(resultApi){
		var message="";
        if(resultApi.gender==null)
        	message="Unfortunately, we cant identify gender of '"+resultApi.name+"'";
        else
        	message="'"+resultApi.name+ "' is "+resultApi.gender+" with probability "+resultApi.probability;
		
        var imgPath = "./image/question.png";
        
		if(resultApi.gender=="male")
	        imgPath = "./image/man.png";
		else if(resultApi.gender=="female")
	        imgPath = "./image/woman.png";
		else
	        imgPath = "./image/question.png";
		
		return "<p>"+message+"</p><img src='"+imgPath+"' />";
	}
	
	function checkGender(){
		var name=document.getElementById("txt-name").value;
	
		if(name.length==0){
			
		}
		else{
			var res = name.split(" ");
	        document.querySelector("#img-load").style.visibility = "visible";
	        
			if(res.length==1){
				$.getJSON("https://api.genderize.io/?name="+name, function(result){
					var htmlResult=setGender(result);
					$("#content-reply").html(htmlResult);

			        document.querySelector("#img-load").style.visibility = "hidden";
				});
			}
			else{
				var url="https://api.genderize.io/?";
				
				for(var i=0;i<res.length;++i){
					url+="name["+i+"]="+res[i]+"&";
				}
				
				url=url.substr(0,url.length - 1);
				$.getJSON(url, function(result){
		            var arrMessage="";
		            
		            if(result.length>=1){
		            	for(var i=0;i<result.length;++i){
							arrMessage+=setGender(result[i]);
		            	}
						$("#content-reply").html(arrMessage);
		            }

			        document.querySelector("#img-load").style.visibility = "hidden";
				});
			}
		}
	}

    /**
     * Sets default event listeners
     * @private
     */
    function setDefaultEvents() {
        // Launch the Callee application when the Call button is clicked
        document.querySelector("#btn-call").addEventListener("click", checkGender);

        // Add eventListener for tizenhwkey
        document.addEventListener("tizenhwkey", function(e) {
            if (e.keyName === "back") {
                try {
                    tizen.application.getCurrentApplication().exit();
                } catch (error) {
                    console.error("getCurrentApplication(): " + error.message);
                }
            }
        });
    }

    /**
     * Initiates the application
     * @private
     */
    function init() {
        setDefaultEvents();
    }

    window.onload = init;
}());
