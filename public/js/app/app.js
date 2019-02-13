//=============================
angular.module('quant-studio', [])

.directive('appMain', function() {
	var component = function($scope, element, attrs, ctlr, transcludeFn) {
		
		
		var output = function(status, details) {
			$('#output').append($('<div>'+status+'</div>'));
			console.log(status, details);
		}
		
		// Init the app when the SDK is loaded
		sdk.onInit(function() {
			output("App started");
		});
		
		// Refresh the charts when the datasets is updated
		sdk.onDatasetUpdate(function(datasets) {
			output("Datasets update received", datasets);
		});
		
		// Refresh the charts when the datasets is updated
		sdk.onProjectChange(function(datasets) {
			output("Project update received", datasets);
		});
		
		// Handle the port drag
		sdk.onDrag(function(eventType, data) {
			switch (eventType) {
				case "start":
					output("[drag] Started -> "+data.data.box+':'+data.data.id, data);
				break;
				case "move":
					if (data.end.left > 0 && data.end.top > 0) {
						output("[drag] Hover ("+data.end.left+";"+data.end.top+") -> "+data.data.box+':'+data.data.id, data);
					} else {
						output("[drag] Moving ("+data.end.left+";"+data.end.top+") -> "+data.data.box+':'+data.data.id, data);
					}
				break;
				case "end":
					output("[drag] Ended -> "+data.data.box+':'+data.data.id, data);
				break;
			}
			
		});
		
	};
	return {
		link: 			component,
		scope:			{
			
		},
		templateUrl:	'/js/app/app.html'
	};
})

//=============================
angular.module('app', ['quant-studio'])

.controller('main', function($scope, $locale) {
	//output("main init()", $scope);
});
