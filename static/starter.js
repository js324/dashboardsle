
var template ="";
var counter = 0;
var num = urllist.websites[counter].id;
var tempcount = 0; 
while (num == urllist.websites[counter].id)
{
	tempcount++;
	counter++;
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

sessionStorage.setItem("position", "0");
setTimeout(function(){
window.location.replace(template);
}, 500);
 
  