var Event = Parse.Object.extend("Event");
var EventCollection = Parse.Collection.extend({
	model:Event
})
var driveEvent = new Event();
var calendar = new EventCollection();


MainView = Backbone.View.extend({
	template: _.template(  $('#main-template').text() ),

	initialize: function() {
		$('.container').append(this.el)

		this.render()

	},

	render: function(){
		this.$el.append(this.template())
		$('.calendar').fullCalendar({
			events: function(start, end, callback) {
				calendar.fetch({
					success: function(collection) {
						var data = []
						collection.each(function(object) {
					    	data.push({title: object.get('eventName'), start: object.get('eventStartYear') + '-' + (object.get('eventStartMonth')+1)+ '-' + object.get('eventStartDate') + ' ' + object.get('eventStartHour')+':' + object.get('eventStartMin')});
					    });
					    console.log(data)
					    callback(data)
					},
					error: function(collection, error) {
				    	// The collection could not be retrieved.
				  	}
				});

			},

		    dayClick: function() {
		        alert('a day has been clicked!');
		    }
		});
	},
})


CreateEventView = Backbone.View.extend({
	
	template: _.template(  $('#new-event-template').text() ),

	events: {
		"click .time": "checkRoute",
		"click .submit_dates": "save"

	},

	className: 'create-new-event',

	initialize: function() {
		
		$('.container').append(this.el)
		this.render()
		var route_time
		

		var $startInput = $('.start_date').pickadate()
		var startDatePicker = $startInput.pickadate('picker')
		var $startTimeInput = $('.start_time').pickatime()
		var startTimePicker = $startTimeInput.pickatime('picker')
		var $endInput = $('.end_date').pickadate()
		var endDatePicker = $endInput.pickadate('picker')
		var $endTimeInput =  $('.end_time').pickatime()
		var endTimePicker = $endTimeInput.pickatime('picker')
	},

	render: function(){
		this.$el.append(this.template())
	},

	destroy: function() {
		this.remove()	
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

	save: function(){ 
		var $startInput = $('.start_date').pickadate()
		var startDatePicker = $startInput.pickadate('picker')
		var $startTimeInput = $('.start_time').pickatime()
		var startTimePicker = $startTimeInput.pickatime('picker')
		var $endInput = $('.end_date').pickadate()
		var endDatePicker = $endInput.pickadate('picker')
		var $endTimeInput =  $('.end_time').pickatime()
		var endTimePicker = $endTimeInput.pickatime('picker')
		
		var diff = startTimePicker.get('select').pick - route_time
		var leaveTimeHour = Math.floor(diff/60)
		console.log(leaveTimeHour)
		var leaveTimeMinute =diff- leaveTimeHour*60
		console.log(leaveTimeMinute)
		var timePeriod = "AM"
		if((diff/60)>=12) {
			timePeriod = "PM"
			leaveTimeHour-=12
			if(leaveTimeHour == 0) {
				leaveTimeHour=12
			}
		}

		var leaveForMeeting = "" + leaveTimeHour + ":" + leaveTimeMinute
		$(".save_event").click(function(){
			driveEvent.set("eventName", $('.event_name').val());
			driveEvent.set("eventStartYear", startDatePicker.get('select').year);
			driveEvent.set("eventStartMonth", startDatePicker.get('select').month);
			driveEvent.set("eventStartDate", startDatePicker.get('select').date);
			driveEvent.set("eventStartHour", startTimePicker.get('select').hour);
			driveEvent.set("eventStartMin", startTimePicker.get('select').mins);
			driveEvent.set("eventEndYear", endDatePicker.get('select').year);
			driveEvent.set("eventEndMonth", endDatePicker.get('select').month);
			driveEvent.set("eventEndDate", endDatePicker.get('select').date);
			driveEvent.set("eventEndHour", endTimePicker.get('select').hour);
			driveEvent.set("eventEndMin", endTimePicker.get('select').mins);
			driveEvent.set("eventLeaveTime", leaveForMeeting);
			driveEvent.set("eventLeaveHour", leaveTimeHour);
			driveEvent.set("eventLeaveMinute", leaveTimeMinute);
			driveEvent.set("timePeriod", timePeriod);
			driveEvent.set("startingAddress", $('.origin-street').val());
			driveEvent.set("startingCity", $('.origin-city').val());
			driveEvent.set("startingState", $('.origin-state').val());
			driveEvent.set("endingAddress", $('.destination-street').val());
			driveEvent.set("endingCity", $('.destination-city').val());
			driveEvent.set("endingState", $('.destination-state').val());


			driveEvent.save(null, {
	  			success: function(eventName) {
	  			  console.log("Save success")
	  		},
	  			error: function(eventName, error) {
	    		// The save failed.
	    		// error is a Parse.Error with an error code and description.
	  		}
		});
		})	 
		$('.container').append('You need to leave at ' + leaveForMeeting + ' ' + timePeriod)
	}		

})