Parse.initialize("jsdvcxCy07th6YIZeB2MWk3WFkppIGtMqlP24cnR", "j1gckPR0G2XGBrDuoXnqQS60sSSJVkRFI3gbAjMr");

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
					    	var pass = false
					    	if(object.get('eventLeaveHour') !== object.get('eventStartHour') ){ 
					    			pass=true
							    	data.push({
							    		title: 'Leave For ' + object.get('eventName'),
							    		start: object.get('eventLeaveYear') + '-' + (object.get('eventLeaveMonth')+1)+ '-' + object.get('eventLeaveDate') + ' ' + object.get('eventLeaveHour')+':' + object.get('eventLeaveMinute'),
							    		end: object.get('eventStartYear') + '-' + (object.get('eventStartMonth')+1)+ '-' + object.get('eventStartDate') + ' ' + object.get('eventStartHour')+':' + object.get('eventStartMin'),
							    		allDay: false,
							    		color: 'green',
							    		id: object.id
							    	})
					    		
					    	}
					    	if(object.get('eventLeaveMinute') !== object.get('eventStartMin')  && pass == false) {
					    		data.push({
							    		title: 'Leave For ' + object.get('eventName'),
							    		start: object.get('eventLeaveYear') + '-' + (object.get('eventLeaveMonth')+1)+ '-' + object.get('eventLeaveDate') + ' ' + object.get('eventLeaveHour')+':' + object.get('eventLeaveMinute'),
							    		end: object.get('eventStartYear') + '-' + (object.get('eventStartMonth')+1)+ '-' + object.get('eventStartDate') + ' ' + object.get('eventStartHour')+':' + object.get('eventStartMin'),
							    		allDay: false,
							    		color: 'green',
							    		id: object.id
							    	})

					    	}
					    });
					    callback(data)
					},
					error: function(collection, error) {
				    	// The collection could not be retrieved.
				  	}
				});

			},

			 eventClick: function(event) {
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
		queryMonth.ascending("eventLeaveHour")
		queryMonth.find({
			  success: function(results) {
			    var count = 0;
			  	for (var i = 0; i < results.length; i++) { 
			       var object = results[i];
			       if (object.get('eventStartDate') == today.getDate()) {
			       		count = count + 1;
			       		$('.daily_container_today').append('<h3>' + object.get('eventName')+ 
			       									':</h3><h5>Need to leave by ' + object.get('eventLeaveTime') +  ' ' + object.get('timePeriod') + 
			       									'</h5><h5>Event is located at ' + object.get('endingAddress') + ' in ' + object.get('endingCity') + ', ' + object.get('endingState') + 
			       									'</h5><div class=underline_border></div>' )
			       }
			       
			     
			     
			     if (object.get('eventStartDate') == today.getDate()+1) {
			       		count = count + 1;
			       		$('.daily_container_tomorrow').append('<h3>' + object.get('eventName')+ 
			       									':</h3><h5>Need to leave by ' + object.get('eventLeaveTime') +  ' ' + object.get('timePeriod') + 
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





