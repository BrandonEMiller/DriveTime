DriveTimeRouter = Backbone.Router.extend({

	routes: {
		"home"		: "home",
		"events/:_id"	: "showEvent",
		"newEvent"	: "createNew",
		
	},

	home: function() {
		$('.container').html('') 
		new MainView()
	},

	createNew: function() {
		 $('.container').html('') 
		 new CreateEventView()	 
	},

	showEvent: function(id) {
		var Event = Parse.Object.extend("Event");
		
		var query = new Parse.Query(Event);
			query.get(id, {
			  success: function(object) {
			    console.log ('Retrieved')
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