/*global describe, it */
'use strict';
(function () {
    describe('Give it some context', function () {
        describe('maybe a bit more context here', function () {

             it('confirm jQuery is avaliable', function () {
        		expect(jQuery() !== undefined || null).to.equal(true);
    	    });

    	  	 it('confirm Underscore is avaliable', function () {
        		expect(_.VERSION !== undefined || null).to.equal(true);
    	    });

    	  	 it('confirm Backbone is avaliable', function () {
        		expect(Backbone.VERSION !== undefined || null).to.equal(true);
    	    });

    	  	 it('should fail here', function() {
    	  	 	expect(route_time).to.equal(57)
    	  	 })
        });
    });
})();
