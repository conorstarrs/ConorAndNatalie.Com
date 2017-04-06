angular.module("app", [])
  .controller("rsvpCtrl", function($scope, $http) {

  	$scope.formSubmitted = false;
  	$scope.formSuccess = false;
  	$scope.formFailed = false;
  	$scope.peopleSuccess = [];
  	$scope.peopleFail = [];
  	$scope.rsvps = [];
    
  	// For the how many people dropdown
	$scope.selectedNumber = 1;
	$scope.numbers = [
		{ id: 0, name: ''},
	    { id: 1, name: '1'},
	    { id: 2, name: '2'},
	    { id: 3, name: '3'},
	    { id: 4, name: '4'},
	    { id: 5, name: '5'}];

	$scope.people = [];

    $scope.add = function () {
      $scope.people = [];
      for(var i = 0; i<$scope.selectedNumber.id;i++) {
	  		$scope.people.push({
	        firstName: "",
	        lastName: "",
	        attending: "",
	        bus: "",
	        otherinfo: ""
	      });
	  	}
    };

    $scope.showSubmit = function () {
    	if($scope.selectedNumber !== numbers[0]) {
    		return true;
    	}
    };

    $scope.submitRSVP = function () {
    	for(var i = 0; i < $scope.people.length; i++) {
    		if($scope.people[i].bus === undefined || $scope.people[i].attending === 'no') {
    			$scope.people[i].bus = 'no';
    		}
	    	var thePerson = 
	                     {
	                         "firstname": $scope.people[i].firstName,
	                         "lastname": $scope.people[i].lastName,
	                         "attending": $scope.people[i].attending,
	                         "bus": $scope.people[i].bus,
	                         "otherinfo" :$scope.people[i].otherinfo
	                     };
	    	$scope.formSubmitted = true;
	    	$http({
			    url: "http://conorandnatalie-api.ddzpqh76bb.eu-west-1.elasticbeanstalk.com/people",
			    method: "POST",
			    data: thePerson,
			    headers: {'Content-Type': 'application/json'}
			}).success(function (data, status, headers, config) {
				$scope.peopleSuccess.push(data);
			}).error(function (data, status, headers, config) {
				$scope.peopleFail.push(config.data);
			});
		}
    };

	$scope.getRSVPs = function () {
    	$http({
	        method : "GET",
	        url : "http://conorandnatalie-api.ddzpqh76bb.eu-west-1.elasticbeanstalk.com/people"
	    }).then(function mySucces(response) {
	        $scope.rsvps = response.data;
	    }, function myError(response) {
	        $scope.rsvps = response.statusText;
	    });
    };

})