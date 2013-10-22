DriveTimeRouter = Backbone.Router.extend({

	routes: {
		
		"events/:_id"	: "showEvent",
		"newEvent"	: "createNew",
		"#"		: "home",
	},

	home: function() {
		$('.container').html('') 
	},

	createNew: function() {
		 $('.container').html('') 
		 new CreateEventView()	 
	},

})

var router = new DriveTimeRouter() 
Backbone.history.start()