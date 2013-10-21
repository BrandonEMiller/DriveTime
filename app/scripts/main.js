Parse.initialize("jsdvcxCy07th6YIZeB2MWk3WFkppIGtMqlP24cnR", "j1gckPR0G2XGBrDuoXnqQS60sSSJVkRFI3gbAjMr");

var route_time 

 //$('.start_date').pickadate()

var $startInput = $('.start_date').pickadate()
var startDatePicker = $startInput.pickadate('picker')
var $startTimeInput = $('.start_time').pickatime()
var startTimePicker = $startTimeInput.pickatime('picker')
var $endInput = $('.end_date').pickadate()
var endDatePicker = $endInput.pickadate('picker')
var $endTimeInput =  $('.end_time').pickatime()
var endTimePicker = $endTimeInput.pickatime('picker')
// Use the picker object directly.



//This is how it gets information on drive time from google maps all wrapped up in a single click event for the moment
$(".time").click(function(){
	var directionsService = new google.maps.DirectionsService();
	var directionsDisplay = new google.maps.DirectionsRenderer();
	
	var map = new google.maps.Map(document.getElementById('map'), {
       zoom:7,
       mapTypeId: google.maps.MapTypeId.ROADMAP
     });

     directionsDisplay.setMap(map);
     directionsDisplay.setPanel(document.getElementById('panel'));

	var request = {
	    origin: $('.origin-street').val() +', '+ $('.origin-city').val() +', ' + $('.origin-state').val(), 
	    destination: $('.destination-street').val() +', '+ $('.destination-city').val() +', ' + $('.destination-state').val(), 
	    travelMode: google.maps.DirectionsTravelMode.DRIVING
	};
	directionsService.route(request, function(response, status) {
	    if (status == google.maps.DirectionsStatus.OK) {
	        var route = response.routes[0];
	        route_time= Math.round(route.legs[0].duration.value/60)
	        directionsDisplay.setDirections(response);

	        console.log(route_time)
	        $('.container').append(route_time + ' minutes')
	       }

	    else {
	    	console.log("Error")
	    }
	});
});


$(".submit_dates").click(function(){ 
	var meetingStart = new Date (startDatePicker.get('select').year, startDatePicker.get('select').month, startDatePicker.get('select').date , startTimePicker.get('select').hour, startTimePicker.get('select').mins, 0, 0)
	var meetingEnd = new Date (endDatePicker.get('select').year, endDatePicker.get('select').month, endDatePicker.get('select').date , endTimePicker.get('select').hour, endTimePicker.get('select').mins, 0, 0)
	console.log(meetingStart)
	//console.log(picker.get('select').date)
	var leaveTimeHour = Math.floor((startTimePicker.get('select').pick - route_time)/60)
	console.log(leaveTimeHour)
	var leaveTimeMinute =startTimePicker.get('select').pick - route_time - leaveTimeHour*60
	console.log(leaveTimeMinute)
	var leaveForMeeting = "" + leaveTimeHour + ":" + leaveTimeMinute
	$('.container').append('You need to leave at ' + leaveForMeeting)
});	