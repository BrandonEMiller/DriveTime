Parse.initialize("jsdvcxCy07th6YIZeB2MWk3WFkppIGtMqlP24cnR", "j1gckPR0G2XGBrDuoXnqQS60sSSJVkRFI3gbAjMr");

var route_time 

 //$('.start_date').pickadate()

var $input = $('.start_date').pickadate()
var picker = $input.pickadate('picker')
var $timeInput = $('.start_time').pickatime()
var timePicker = $timeInput.pickatime('picker')

// Use the picker object directly.



//This is how it gets information on drive time from google maps all wrapped up in a single click event for the moment
$(".time").click(function(){
	var directionsService = new google.maps.DirectionsService();
	     var directionsDisplay = new google.maps.DirectionsRenderer();
	     var request = {
	       origin: $('.origin-street').val() +', '+ $('.origin-city').val() +', ' + $('.origin-state').val(), 
	       destination: $('.destination-street').val() +', '+ $('.destination-city').val() +', ' + $('.destination-state').val(), 
	       travelMode: google.maps.DirectionsTravelMode.DRIVING
	     };
	     directionsService.route(request, function(response, status) {
	       if (status == google.maps.DirectionsStatus.OK) {
	         var route = response.routes[0];
	         route_time= Math.round(route.legs[0].duration.value/60)

	         console.log(route_time)
	         $('.hero-unit').append(route_time + ' minutes')
	       }

	       else {
	       	console.log("Error")
	       }
	     });
});


$(".submit_dates").click(function(){ 
	var meetingStart = new Date (picker.get('select').year, picker.get('select').month, picker.get('select').date , timePicker.get('select').hour, timePicker.get('select').mins, 0, 0)
	// var meetingEnd = new Date ($('.end_year').val(), ($('.end_month').val()-1), $('.end_day').val() , $('.end_hour').val(), $('.end_minute').val(), 0, 0)
	console.log(meetingStart)
	//console.log(picker.get('select').date)

	// console.log(meetingEnd)
	var leaveForMeeting = new Date(meetingStart-(route_time*60*1000))
	console.log(timePicker.get('select').mins)
	$('.hero-unit').append('You need to leave at' + leaveForMeeting)
});	