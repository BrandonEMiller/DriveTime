CreateLeaveEventView = Backbone.View.extend({
	
	template: _.template(  $('#new-leave-event-template').text() ),

	events: {
		"click .time": "checkRoute",
		"click .submit_dates": "save",
		"click .cancel_event": "cancel",
		"click .new_normal_event": "newLeaveEvent"

	},

	className: 'create-new-event',

	initialize: function() {
		
		$('.container').append(this.el)
		this.render()
		var route_time
		

		var $leaveInput = $('.leave_date').pickadate()
		var leaveDatePicker = $leaveInput.pickadate('picker')
		var $leaveTimeInput = $('.leave_time').pickatime({interval: 15})
		var leaveTimePicker = $leaveTimeInput.pickatime('picker')
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
		        $('.button_container_input').append('<button class="submit_dates">Submit Dates</button>')

		        $('.container').append(route_time + ' minutes <br>')
		       }

		    else {
		    	console.log("Error")
		    }
		});
	},

	save: function(){ 
		$('.button_container_input').append('<button class="save_event">Save Event</button>')
		var driveEvent = new Event();
		var $leaveInput = $('.leave_date').pickadate()
		var leaveDatePicker = $leaveInput.pickadate('picker')
		var $leaveTimeInput = $('.leave_time').pickatime({interval: 15})
		var leaveTimePicker = $leaveTimeInput.pickatime('picker')
		
		var sum = leaveTimePicker.get('select').pick + route_time
		var startEventHour = Math.floor(sum/60)
		var startEventMins = sum - startEventHour*60
		var endEventHour = Math.floor((sum + $('.hour_length').val()*60 + $('.minute_length').val()*1)/60)
		var endEventMins = sum + $('.hour_length').val()*60 + $('.minute_length').val()*1 - endEventHour*60
		

		var timePeriod = "AM"
		var startTimePeriod = "AM"
		var leaveTimeHourAdjusted = leaveTimePicker.get('select').hours
		var startTimeHourAdjusted = startEventHour
		var startEventDay = leaveDatePicker.get('select').date
		var startEventMonth = leaveDatePicker.get('select').month
		var startEventYear = leaveDatePicker.get('select').year

		if (startTimeHourAdjusted >= 24) {
			startEventDay+=1
			if (startEventDay > 31) {
				startEventDay = 1
				startEventMonth+= 1
				if (startEventMonth == 12) {
					startEventMonth=0
					startEventYear+=1
				}
			}
			if (startEventMonth== 1){
				if(startEventDay>28){
					startEventDay=1
					startEventMonth=2
				}

			}

			if(startEventDay>30){
				if (startEventMonth == 10 || 8 || 5 || 3){
					startEventDay=1
					startEventMonth+=1
				}
			}
			startTimeHourAdjusted-=24
			startEventHour-=24
			
			if(startTimeHourAdjusted>=12) {
				startTimePeriod = "PM"
				startTimeHourAdjusted-=12
				
				if(startTimeHourAdjusted == 0) {
					startTimeHourAdjusted=12
				}
			}
		}
		
		if (startEventMins == 0){
			var startTimeString =""+ startTimeHourAdjusted + ":" + startEventMins + "0 " + startTimePeriod + "";
		} else {
			var startTimeString =""+ startTimeHourAdjusted + ":" + startEventMins + " " + startTimePeriod + "";
		}

		var endTimePeriod = "AM"
		var endTimeHourAdjusted = endEventHour
		var endEventDay = leaveDatePicker.get('select').date
		var endEventMonth = leaveDatePicker.get('select').month
		var endEventYear = leaveDatePicker.get('select').year


		if (endTimeHourAdjusted >= 24) {
			endEventDay+=1
			if (endEventDay > 31) {
				endEventDay = 1
				endEventMonth+= 1
				if (endEventMonth == 12) {
					endEventMonth=0
					endEventYear+=1
				}
			}
			if (endEventMonth== 1){
				if(endEventDay>28){
					endEventDay=1
					endEventMonth=2
				}

			}

			if(endEventDay>30){
				if (endEventMonth == 10 || 8 || 5 || 3){
					endEventDay=1
					endEventMonth+=1
				}
			}
			

			endTimeHourAdjusted-=24
			endEventHour-=24

			if(endTimeHourAdjusted>=12) {
				endTimePeriod = "PM"
				endTimeHourAdjusted-=12
				if(endTimeHourAdjusted == 0) {
					endTimeHourAdjusted=12
				}
			}
		}

		if (endEventMins == 0){
			var endTimeString =""+ endTimeHourAdjusted + ":" + endEventMins + "0 " + endTimePeriod + "";
		} else {
			var endTimeString =""+ endTimeHourAdjusted + ":" + endEventMins + " " + endTimePeriod + "";
		}

		if(leaveTimeHourAdjusted>=12) {
			timePeriod = "PM"
			leaveTimeHourAdjusted-=12
			if(leaveTimeHourAdjusted == 0) {
				leaveTimeHourAdjusted=12
			}
		}

		var leaveForMeeting = "" + leaveTimeHourAdjusted + ":" + leaveTimePicker.get('select').mins
		$(".save_event").click(function(){
			driveEvent.set("eventName", $('.event_name').val());
			driveEvent.set("eventStartYear", startEventYear);
			driveEvent.set("eventStartMonth", startEventMonth);
			driveEvent.set("eventStartDate", startEventDay);
			driveEvent.set("eventStartHour", startEventHour);
			driveEvent.set("eventStartHourAdjusted", startTimeHourAdjusted);
			driveEvent.set("eventStartTimeString", startTimeString);
			driveEvent.set("eventStartMin", startEventMins);
			driveEvent.set("eventEndYear", endEventYear);
			driveEvent.set("eventEndMonth", endEventMonth);
			driveEvent.set("eventEndDate", endEventDay);
			driveEvent.set("eventEndHour", endEventHour);
			driveEvent.set("eventEndHourAdjusted", endTimeHourAdjusted);
			driveEvent.set("eventEndTimeString", endTimeString);
			driveEvent.set("eventEndMin", endEventMins);
			driveEvent.set("eventLeaveTime", leaveForMeeting);
			driveEvent.set("eventLeaveDate", leaveDatePicker.get('select').date);
			driveEvent.set("eventLeaveMonth", leaveDatePicker.get('select').month);
			driveEvent.set("eventLeaveYear", leaveDatePicker.get('select').year);
			driveEvent.set("eventLeaveHour", leaveTimePicker.get('select').hour);
			driveEvent.set("eventLeaveMinute", leaveTimePicker.get('select').mins);
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
		$('.container').append('You will arrive at ' + startTimeString)
	},

	cancel: function() {
		router.navigate('home', {trigger: true});
	},

	newLeaveEvent: function() {
		router.navigate('newEvent', {trigger: true});
	}		

})




