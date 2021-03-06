DriveTimeRouter = Backbone.Router.extend({

	routes: {
		"home"			: "home",
		"events/:_id"	: "showEvent",
		"newEvent"		: "createNew",
		"new_leave_event": "createNewLeave",
		"about"			: "about",
		""				: "home"
		
	},

	home: function() {
		$('.container').html('') 
		new MainView()
	},

	about: function() {
		$('.container').html('') 
		new AboutView()
	},

	createNew: function() {
		 $('.container').html('') 
		 new CreateEventView()	 
	},

	createNewLeave: function() {
		$('.container').html('') 
		new CreateLeaveEventView()	
	},

	showEvent: function(id) {
		var Event = Parse.Object.extend("Event");
		
		var query = new Parse.Query(Event);
			query.get(id, {
			  success: function(object) {
			  	$('.container').html('') 
				new EditEventView({model: object})
			  },
			  error: function(object, error) {
			    // The object was not retrieved successfully.
			    // error is a Parse.Error with an error code and description.
			  }
			});
	}

})

var router = new DriveTimeRouter() 
Backbone.history.start()