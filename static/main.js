
var template = ""; 

//how does counter work? 
//
var counter = parseInt(sessionStorage.getItem("position"));
var timing = urllist.websites[counter].time; //will set timing based on first url of that slide
var tempcount = 0; 

 
function initializeV(nums,width,height,urls){
                
                //1% of the parent viewport width (same as 1vw):
            	var vw = window.innerWidth/100;
                //1% of the viewport height (same as 1vh):
            	var vh = window.innerHeight/100;
                var numbers =document.getElementsByClassName('test');
				
                for (var i = 0; i<nums; i++){
					numbers[i].style.width=width*vw+'px';
					numbers[i].style.height =height*vh+'px';
					numbers[i].src = urllist.websites[counter+i].url;
				
				}
				counter=counter+nums;
				document.getElementById("somediv").style.height=100*vh+'px';
				if (urls==3) {
					
					numbers[2].style.width=50*vw+'px';
					numbers[2].style.height=100*vh+'px';
				
				}
				var yourFrame = document.getElementById('last'); 
				yourFrame.addEventListener("load", function() { 
					$("#somediv").fadeIn("slow");
				});
                //assign width and height to your v unit elements here
}    

window.onload=function() 
{
	$("#navbar").hover(function() {
	$(this).css("display", "block");
	});
	
	switch (document.getElementsByClassName("test").length)
	{
		case 1:
			initializeV(1, 100, 100, 1);
			break;
		case 2:
			initializeV(2, 49.5, 100, 2);
			break;
			
		case 3:
			initializeV(3,49,50,3);
			break;
			
		case 4: 
			initializeV(4,50,50,4);
			break;
	}
	if (counter == urllist.websites.length) 
{
	counter = 0; 
}
	var num = urllist.websites[counter].id;
	while (num == urllist.websites[counter+tempcount].id)
	{
		tempcount++;
		if (counter+tempcount == urllist.websites.length) 
		{
			break; 
		}
	}	
 //Set counter to first id, go until id doesn't match (last url of that slide) 
switch (tempcount)
	{
		case 1:
			template="templateone";
			break;
		case 2:
			template="templatetwo";
			break;
			
		case 3:
			template="templatethree";
			break;
			
		case 4: 
			template="templatefour";
			break;
	}

sessionStorage.setItem("position", counter.toString());

	
var myVar = setInterval(myTimer, timing*1000); //would add var timing here

function myTimer()
{
	
$("#somediv").fadeOut("slow");
setTimeout(function(){
window.location.replace(template); //add var template here
}, 500);



}

}