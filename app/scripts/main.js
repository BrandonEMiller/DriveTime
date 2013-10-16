Parse.initialize("jsdvcxCy07th6YIZeB2MWk3WFkppIGtMqlP24cnR", "j1gckPR0G2XGBrDuoXnqQS60sSSJVkRFI3gbAjMr");


$(".time").click(function(){
	var directionsService = new google.maps.DirectionsService();
	     var directionsDisplay = new google.maps.DirectionsRenderer();


	     var request = {
	       origin: $('.origin-street').val() +', '+ $('.origin-city').val() +', ' + $('.origin-state').val(), 
	       destination: $('.destination-street').val() +', '+ $('.destination-city').val() +', ' + $('.destination-state').val(), 
	       travelMode: google.maps.DirectionsTravelMode.DRIVING
	     };
	     console.log (request.origin)
	     console.log($('.destination-street').val())
	     directionsService.route(request, function(response, status) {
	       if (status == google.maps.DirectionsStatus.OK) {
	         directionsDisplay.setDirections(response);
	         var route = response.routes[0];
	         var route_time= Math.round(route.legs[0].duration.value/60)

	         console.log(route_time)
	         $('.hero-unit').append(route_time + ' minutes')
	       }

	       else {
	       	console.log("Error")
	       }
	     });
});