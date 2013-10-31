/*global describe, it */
'use strict';
(function () {
    describe('DriveTime', function () {
        describe('should by default', function () {

             it('confirm jQuery is avaliable', function () {
        		expect(jQuery() !== undefined || null).to.equal(true);
    	    });

    	  	 it('confirm Underscore is avaliable', function () {
        		expect(_.VERSION !== undefined || null).to.equal(true);
    	    });

    	  	 it('confirm Backbone is avaliable', function () {
        		expect(Backbone.VERSION !== undefined || null).to.equal(true);
    	    });

             it('confirm that the Main View is avaliable', function() {
                expect(MainView !== undefined || null).to.equal(true);
             })
             it('confirm that the Create Event View is avaliable', function() {
                expect(CreateEventView !== undefined || null).to.equal(true);
             })
             it('confirm that the Create Leave Event View is avaliable', function() {
                expect(CreateLeaveEventView !== undefined || null).to.equal(true);
             })
             it('confirm that the Edit View is avaliable', function() {
                expect(EditEventView !== undefined || null).to.equal(true);
             })
             it('confirm that the About View is avaliable', function() {
                expect(AboutView !== undefined || null).to.equal(true);
             })

             it('should have a home route', function () {
                expect(router.routes['']).to.equal('home')
             })
             it('should have a home route at /home', function () {
                expect(router.routes['home']).to.equal('home')
             }) 
             it('should have a New Event route at /newEvent', function () {
                expect(router.routes['newEvent']).to.equal('createNew')
             }) 
             it('should have a New Leave Event route at /new_leave_event', function () {
                expect(router.routes['new_leave_event']).to.equal('createNewLeave')
             }) 
             it('should have an about route at /about', function () {
                expect(router.routes['about']).to.equal('about')
             }) 
             it('should have an Edit route at /events/:_id', function () {
                expect(router.routes['events/:_id']).to.equal('showEvent')
             })

             // it('should be able to access google maps api', function() {
             //    var route=0

             //    var directionsService = new google.maps.DirectionsService();
             //    var directionsDisplay = new google.maps.DirectionsRenderer();
        

        

             //    var request = {
             //        origin: "Greenville, SC",
             //        destination: "Columbia, SC",
             //        travelMode: google.maps.DirectionsTravelMode.DRIVING
             //    };
             //    directionsService.route(request, function(response, status) {
             //        if (status == google.maps.DirectionsStatus.OK) {
             //            route = response.routes[0];
             //            console.log (route) 
                        
                       
             //        }

             //        else {
             //            console.log("Error")
             //        }
             //    })

             //    expect(route).to.be.above(0)
             //    console.log (route) 
             // })


        });
    });
})();
