var map = new Map();
var span = document.getElementsByClassName("close")[0];
var counter =0;
for (var x = 0; x < urllists.websites[urllists.websites.length-1].id; x++)
{
	var temparr = [];
	if (x == urllists.websites[urllists.websites.length-1].id-1)
	{
		counter = urllists.websites.length;
	}
	else 
	{
		var temp = x+1;
		counter = arrpos[temp];
	}		
	for (var count = 0; count<counter-arrpos[x]; count++){
		temparr.push(urllists.websites[count+arrpos[x]].url);
		
	}
	temparr.push(urllists.websites[arrpos[x]].time);

	map.set(x+1, temparr);
}
console.log(map);
var counter =urllists.websites[urllists.websites.length-1].id+1;
function submitMap(map)
{
	const mapToAoO = m => { //taken from stackoverflow, converts map to array of objects
				return Array.from(m).map( ([k,v]) => {return {[k]:v}} );
			};
			
		$.ajax({
			  type: "POST",
			  contentType: "application/json;charset=utf-8",
			  url: "/recieve",
			  traditional: "true",
			  data: JSON.stringify(mapToAoO(map)),
			  dataType: "json"
		});
}
$( document ).ready(function() {
//Just add $ onclick for each button, reference parent (the entire row) and delete or get contents, etc.
 $(".btn").click(function() {
	
	if ($(this).hasClass("add")) 
	{
		$(".modal").css("display", "block");
		$(".modal-body").css("display", "block");
		$(".modal-title").html("Adding a Slide");
		$(".modal-header").css("background-color", "#6DA6CF");
		$(".btn-primary").css("background-color", "#6DA6CF");
		$(".btn-primary").html("Add");
		$(".form-control").attr("value",""); 
		$("#form5").attr("value", "");
		var array= []; 
		$( "form" ).submit(function( event ) {
			var data = $(this).serializeArray();
			console.log(data);
			var array=[];
			for (var i = 0; i<data.length; i++)
			{
				if (data[i].value.length!=0)
				{
				array.push(data[i].value);
				}
			}
			//array = data[0].value.split(',');
			
			console.log(array);
			map.set(counter, array);
			console.log(map);
			submitMap(map);
			location.reload(true);
		});
		
	}
	if ($(this).hasClass("edit")) 
	{
		$(".modal").css("display", "block");
		$(".modal-body").css("display", "block");
		$(".modal-title").html("Editing a Slide");
		$(".modal-header").css("background-color", "#f4c141");
		$(".btn-primary").css("background-color", "#f4c141");
		var urls = $(this).closest('tr').children("th.ids").text();
		var timing = $(this).closest('tr').children("th.timing").text().replace(/\s/g, "");
		timing = timing.substring(0, timing.length - 1);
		var lastele = map.get(urls-0).pop(); //have to pop last element (timing) so it doesnt show up in input
		var dataurls = document.getElementsByClassName("form-control");
		console.log(dataurls);
		for (var i = 0; i<map.get(urls-0).length; i++)
		{
			dataurls[i].setAttribute("value", map.get(urls-0)[i]);
		}
		
		map.get(urls-0).push(lastele);
		$("#form5").attr("value", timing);
		$(".btn-primary").html("Edit");
		$( "form" ).submit(function( event ) {
			var data = $(this).serializeArray();
			console.log(data);
			var array=[];
			for (var i = 0; i<data.length; i++)
			{
				if (data[i].value.length!=0)
				{
				array.push(data[i].value);
				}
			}
			console.log(array);
			map.set(urls-0, array);
			console.log(map);  
			submitMap(map);
			location.reload(true);
		});
		
		
	}
	if ($(this).hasClass("delete")) 
	{
		$(".modal").css("display", "block");
		$(".modal-title").html("Deleting a Slide");
		$(".modal-header").css("background-color", "#f44242");
		$(".btn-primary").css("background-color", "#f44242");
		$(".btn-primary").html("Delete");
		$(".modal-body").css("display", "none");
		var urls = $(this).closest('tr').children("th.ids").text();
		$( "form" ).submit(function( event ) {
			for (var i = 0; i < counter-1-urls-0; i++)
			{
			
				var replace =map.get(parseInt(urls)+1+i);
				
				map.set(urls-0+i, replace);
			}
			map.delete(counter-1);
			console.log(map);
			submitMap(map);
			location.reload(true);
		});
	}
 }); 
 //weird workaround by refreshing the page, whenever user inputted something, inputs would save across different edit buttons (wouldn't load different urls)
	$(".btn-primary").click( function() {
		$(".modal").css("display", "none");
		location.reload(true);
	});
	$(".close").click( function() {
		$(".modal").css("display", "none");
		location.reload(true);
	});
	$(window).click(function(e) {
		if (e.target.id == "myModal") 
		{
			$(".modal").css("display", "none");
			location.reload(true);
		}	
	});
	
});
//add modal box for each
//Likely going to add to map, then give back to server and refresh every time theres a change/
//Inefficient considering i have to send entire map and reload page everytime it changes, but easiest