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