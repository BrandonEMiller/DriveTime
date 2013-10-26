EditEventView = Backbone.View.extend({
	template: _.template(  $('#edit-event-template').text() ),

	initialize: function() {
		$('.container').append(this.el)
		this.render()
		console.log(this.model.get('eventName'))
	},

	render: function(){
		this.$el.append(this.template({calendarEvent: this.model}))
		this.checkRoute()
	},

	checkRoute: function(){
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

		        $('.container').append(route_time + ' minutes <br>')
		       }

		    else {
		    	console.log("Error")
		    }
		});
	},

})