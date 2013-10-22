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

})

var router = new DriveTimeRouter() 
Backbone.history.start()