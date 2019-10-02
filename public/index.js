const AUTOCOMPLETION_URL = 'http://localhost:3000/autocomplete';
const FORWARD_URL = 'http://localhost:3000/forward';
const REVERSE_URL = 'http://localhost:3000/reverse';
const TIMEOUT = 500;

$(document).ready(function() { 

	let timeout = null;  

	$("#autocompleteQuery").keyup(function () {
	  if (timeout != null) {
		clearTimeout(timeout);
	  }
	  
	  timeout = setTimeout(function() {
		timeout = null;  

		let searchtext = $("#autocompleteQuery").val();
		
		$.ajax({
			type: 'GET',
			url: AUTOCOMPLETION_URL + '?query=' + encodeURIComponent(searchtext),
			dataType: "json",
			success: function(data){
				$('.autocompleteResults').empty();
				
				$.each(data, function (index, suggestion) {
					$('.autocompleteResults')
						.append($('<li>').html(suggestion));
				});		
			},
			error:function(a, b,c) {
				console.log(b);
			}
		})

	  }, TIMEOUT);  
	  }) 

	$("#btnForward").click(function () {
		let searchtext = $("#forwardQuery").val();
		
	
		$.ajax({
			type: 'GET',
			url: FORWARD_URL + '?query=' + encodeURIComponent(searchtext),
			dataType: "json",
			success: function(data){
				$('.forwardResults').empty();
				
				$.each(data, function (index, location) {
					$('.forwardResults')
						.append($('<li>')
							.html('Address: ' + location.Address 
								+ ' - Latitude: ' + location.Latitude 
								+ ' - Longitude: ' + location.Longitude));
				});		
			},
			error:function(a, b,c) {
				console.log(b);
			}
		});
	});
	

	$("#btnReverse").click(function () {
		let latitude = $("#reverseLatitude").val();
		let longitude = $("#reverseLongitude").val();
		let position = encodeURIComponent(latitude + ',' + longitude);
		
		$.ajax({
			type: 'GET',
			url: REVERSE_URL 
				+ '?pos=' + position
				+ '&prox=' + position,
			dataType: "json",
			success: function(data){
				console.log(data);
				$('.reverseResults').empty();
				
				$.each(data, function (index, location) {
					$('.reverseResults')
						.append($('<li>')
							.html('Address: ' + location.Address 
								+ ' - Latitude: ' + location.Latitude 
								+ ' - Longitude: ' + location.Longitude));
				});		
			},
			error:function(a, b,c) {
				console.log(b);
			}
		});
	});	
}); 
