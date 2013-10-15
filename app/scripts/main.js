var directionsService = new google.maps.DirectionsService();
     var directionsDisplay = new google.maps.DirectionsRenderer();


     var request = {
       origin: '405 New Tarleton Way, greer, sc', 
       destination: '110 Watermill Road, greer, sc',
       travelMode: google.maps.DirectionsTravelMode.DRIVING
     };

     directionsService.route(request, function(response, status) {
       if (status == google.maps.DirectionsStatus.OK) {
         directionsDisplay.setDirections(response);
         var route = response.routes[0];
         console.log(route.legs[0].duration.value/60)
       }
     });