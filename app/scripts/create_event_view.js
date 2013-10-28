CreateEventView = Backbone.View.extend({
	
	template: _.template(  $('#new-event-template').text() ),

	events: {
		"click .time": "checkRoute",
		"click .submit_dates": "save",
		"click .cancel_event": "cancel"

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
		var driveEvent = new Event();
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
		var startTimePeriod = "AM"
		var leaveTimeHourAdjusted = leaveTimeHour
		var startTimeHourAdjusted = startTimePicker.get('select').hour
		if(startTimeHourAdjusted>=12) {
			startTimePeriod = "PM"
			startTimeHourAdjusted-=12
			if(startTimeHourAdjusted == 0) {
				startTimeHourAdjusted=12
			}
		}
		if (startTimePicker.get('select').mins == 0){
			var startTimeString =""+ startTimeHourAdjusted + ":" + startTimePicker.get('select').mins + "0 " + startTimePeriod + "";
		} else {
			var startTimeString =""+ startTimeHourAdjusted + ":" + startTimePicker.get('select').mins + " " + startTimePeriod + "";
		}

		var endTimePeriod = "AM"
		var endTimeHourAdjusted = endTimePicker.get('select').hour
		if(endTimeHourAdjusted>=12) {
			endTimePeriod = "PM"
			endTimeHourAdjusted-=12
			if(endTimeHourAdjusted == 0) {
				endTimeHourAdjusted=12
			}
		}
		if (endTimePicker.get('select').mins == 0){
			var endTimeString =""+ endTimeHourAdjusted + ":" + endTimePicker.get('select').mins + "0 " + endTimePeriod + "";
		} else {
			var endTimeString =""+ endTimeHourAdjusted + ":" + endTimePicker.get('select').mins + " " + endTimePeriod + "";
		}

		var leaveTimeDate = startDatePicker.get('select').date
		var leaveTimeMonth = startDatePicker.get('select').month
		var leaveTimeYear	= startDatePicker.get('select').year
		if (leaveTimeHour<0) {
			leaveTimeHour+=24
			if(leaveTimeDate > 1){
				leaveTimeDate-=1
			} else {
				leaveTimeDate=31
				leaveTimeMonth-=1
				if (leaveTimeMonth == 1) {
					leaveTimeDate=28
				}
				if (leaveTimeMonth == 8){
					leaveTimeDate = 30
				}
				if (leaveTimeMonth == 10){
					leaveTimeDate = 30
				}
				if (leaveTimeMonth == 3){
					leaveTimeDate = 30
				}
				if (leaveTimeMonth == 5){
					leaveTimeDate = 30
				}
				if (leaveTimeMonth == -1){
					leaveTimeMonth=11
					leaveTimeDate=31
					leaveTimeYear-=1
				}


			}
		}
		if((diff/60)>=12) {
			timePeriod = "PM"
			leaveTimeHourAdjusted-=12
			if(leaveTimeHourAdjusted == 0) {
				leaveTimeHourAdjusted=12
			}
		}

		var leaveForMeeting = "" + leaveTimeHourAdjusted + ":" + leaveTimeMinute
		$(".save_event").click(function(){
			driveEvent.set("eventName", $('.event_name').val());
			driveEvent.set("eventStartYear", startDatePicker.get('select').year);
			driveEvent.set("eventStartMonth", startDatePicker.get('select').month);
			driveEvent.set("eventStartDate", startDatePicker.get('select').date);
			driveEvent.set("eventStartHour", startTimePicker.get('select').hour);
			driveEvent.set("eventStartHourAdjusted", startTimeHourAdjusted);
			driveEvent.set("eventStartTimeString", startTimeString);
			driveEvent.set("eventStartMin", startTimePicker.get('select').mins);
			driveEvent.set("eventEndYear", endDatePicker.get('select').year);
			driveEvent.set("eventEndMonth", endDatePicker.get('select').month);
			driveEvent.set("eventEndDate", endDatePicker.get('select').date);
			driveEvent.set("eventEndHour", endTimePicker.get('select').hour);
			driveEvent.set("eventEndHourAdjusted", endTimeHourAdjusted);
			driveEvent.set("eventEndTimeString", endTimeString);
			driveEvent.set("eventEndMin", endTimePicker.get('select').mins);
			driveEvent.set("eventLeaveTime", leaveForMeeting);
			driveEvent.set("eventLeaveDate", leaveTimeDate);
			driveEvent.set("eventLeaveMonth", leaveTimeMonth);
			driveEvent.set("eventLeaveYear", leaveTimeYear);
			driveEvent.set("eventLeaveHour", leaveTimeHour);
			driveEvent.set("eventLeaveMinute", leaveTimeMinute);
			driveEvent.set("eventLeaveHourAdjusted", leaveTimeHourAdjusted);
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
	  			  router.navigate('home', {trigger: true});
	  		},
	  			error: function(eventName, error) {
	    		// The save failed.
	    		// error is a Parse.Error with an error code and description.
	  		}
		});
		})	 
		$('.container').append('You need to leave at ' + leaveForMeeting + ' ' + timePeriod)
	},

	cancel: function() {
		router.navigate('home', {trigger: true});
	}		

})
