var Event = Parse.Object.extend("Event");
var EventCollection = Parse.Collection.extend({
	model:Event
})

var calendar = new EventCollection();



MainView = Backbone.View.extend({
	template: _.template(  $('#main-template').text() ),

	events: {
		"click .new_event": "new"

	},

	initialize: function() {
		$('.container').append(this.el)

		this.render()

	},

	render: function(){
		this.$el.append(this.template())
		this.daily()
		$('.calendar').fullCalendar({
			header: {
				left:  'today prev,next',
				center: 'title',
				right:  'agendaDay agendaWeek month' 
			},
			events: function(start, end, callback) {
				calendar.fetch({
					success: function(collection) {
						var data = []
						collection.each(function(object) {
					    	data.push({
					    		title: object.get('eventName'), 
					    		start: object.get('eventStartYear') + '-' + (object.get('eventStartMonth')+1)+ '-' + object.get('eventStartDate') + ' ' + object.get('eventStartHour')+':' + object.get('eventStartMin'),
					    		end: object.get('eventEndYear') + '-' + (object.get('eventEndMonth')+1)+ '-' + object.get('eventEndDate') + ' ' + object.get('eventEndHour')+':' + object.get('eventEndMin'),
					    		allDay: false,
					    		id: object.id
					    	});
					    	data.push({
					    		title: 'Leave For ' + object.get('eventName'),
					    		start: object.get('eventStartYear') + '-' + (object.get('eventStartMonth')+1)+ '-' + object.get('eventLeaveDate') + ' ' + object.get('eventLeaveHour')+':' + object.get('eventLeaveMinute'),
					    		end: object.get('eventStartYear') + '-' + (object.get('eventStartMonth')+1)+ '-' + object.get('eventStartDate') + ' ' + object.get('eventStartHour')+':' + object.get('eventStartMin'),
					    		allDay: false,
					    		color: 'green',
					    		id: object.id
					    	})
					    });
					    console.log(data)
					    callback(data)
					},
					error: function(collection, error) {
				    	// The collection could not be retrieved.
				  	}
				});

			},

			 eventClick: function(event) {
		       //alert('an event has been clicked! It has an id of ' + event.id);
		       router.navigate('events/' + event.id, {trigger: true});

		    },

		    dayClick: function() {
		        console.log('a day has been clicked!');
		    },

		});
	},
	daily: function () {
		var queryMonth = new Parse.Query(Event);
		var today = new Date()
		queryMonth.equalTo("eventStartMonth", today.getMonth());
		queryMonth.find({
			  success: function(results) {
			    var count = 0;
			  	for (var i = 0; i < results.length; i++) { 
			       var object = results[i];
			       if (object.get('eventStartDate') == today.getDate()) {
			       		count = count + 1;
			       		$('.daily_container').append('<h3>' + object.get('eventName')+ 
			       									':</h3><h5>Need to leave by ' + object.get('eventLeaveHourAdjusted') + ':' + object.get('eventLeaveMinute') + ' ' + object.get('timePeriod') + 
			       									'</h5><h5>Event is located at ' + object.get('endingAddress') + ' in ' + object.get('endingCity') + ', ' + object.get('endingState') + 
			       									'</h5><div class=underline_border></div>' )
			       }
			       
			     
			     }
			     if (count == 0) {
			       		$('.daily_container').append('<h3> No Events Scheduled Today </h3>')
			       }
			  },
			  error: function(error) {
			    alert("Error: " + error.code + " " + error.message);
			  }
			});
	},

	new: function() {
		router.navigate('newEvent', {trigger: true});
	}
})


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
		if (leaveTimeHour<0) {
			leaveTimeHour+=24
			leaveTimeDate-=1
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

AboutView = Backbone.View.extend({
	template: _.template(  $('#about-template').text() ),

	initialize: function() {
		$('.container').append(this.el)
		this.render()
	},

	render: function(){
		this.$el.append(this.template())
	},

})