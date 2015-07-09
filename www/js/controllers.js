angular.module('starter.controllers', ['ionic','ngOpenFB','uiGmapgoogle-maps','cordovaGeolocationModule','ngCordova'])


.controller('ProfileCtrl', function($rootScope,$scope, $stateParams) {
$scope.profimage=$rootScope.profpic;
$scope.goprof=function(){
	window.open('https://facebook.com/'+$rootScope.user.id,'_system');
}
})

.controller('LogoutCtrl', function($ionicViewService,ngFB,$scope,$state, $stateParams,$ionicHistory) {
    $ionicViewService.nextViewOptions({
    disableBack: true
    });
    
ngFB.logout(function(res){
    
});
//super.clearCache();
    window.localStorage.removeItem("store");
    window.localStorage.removeItem("atkn");
    $ionicHistory.clearHistory();
    $ionicHistory.clearCache();
$state.go('login');
})

.controller('PlayerProfileCtrl', function($rootScope,$scope, $stateParams) {
$scope.profimage=$rootScope.profpic;
$scope.goprof=function(){
	window.open('https://facebook.com/'+$rootScope.user.id,'_system');
}
})

.controller('FirstCtrl', function($ionicViewService,$state,ngFB,$timeout,$http,$rootScope) {
	$rootScope.user={};
	$ionicViewService.nextViewOptions({
    disableBack: true
	});
	var value=null,actkn="";

	value = window.localStorage.getItem("store");
    //alert(value);
	//alert(actkn);
	if(value!=null)
	{
		$state.go('load');
	}
	else
		$state.go('login');
})

.controller('GameDetailsCtrl', function($timeout,$state,$scope,$rootScope,sharedProperties,uiGmapGoogleMapApi, uiGmapLogger) {
	
    $scope.match={};
	$scope.decide="";
	$scope.players=[];
    
	var GameDetails = Parse.Object.extend("GameDetails");
	var Match = Parse.Object.extend("Match");

	var mquery = new Parse.Query(Match);
	var query = new Parse.Query(GameDetails);

	mquery.get(sharedProperties.getid(),
		{success:function(obj){
            
			$scope.match={
        		mapmarker:_.clone({
        							id:0,
        							coords:
        							{
        								latitude :obj.get("location").latitude,
        								longitude:obj.get("location").longitude
        							}},true),
        		center:{
        				"latitude" :obj.get("location").latitude,
        				"longitude":obj.get("location").longitude
        			   },
        		gam:obj,
        		sportname:obj.get("sportName"),
        		matchID:obj.id,
        		options:{}
        		}
		},
		error:function(){

		}});

	query.equalTo("matchid",sharedProperties.getid());
	query.equalTo("userid",$rootScope.user.id);

	query.count({
        success: function(number) {
        	if(number!=0)
        		$scope.decide="Drop";
        	else 
        		$scope.decide="Join";
        },
        error: function(error) {
        }
      });


	$scope.number=0;
	var players={};
	var query2 = new Parse.Query(GameDetails);
	query2.equalTo("matchid",sharedProperties.getid());
	
		query2.find({
        success: function(matches) {
        	//alert(matches[0].get("username"));
        	for(var i=0;i< matches.length;i++)
            {
        	   $scope.players.push({count:(i+1),name:matches[i].get("username"),id:matches[i].get("userid")});
               
            }
        	//players=players;
        	//$state.reload();
        },
        error: function(error){
        }
      });
    

	$scope.goprof=function(id){
		window.open('https://facebook.com/'+id,'_system');
	}

	$scope.clicked=function(){

		//alert($scope.decide);
		if($scope.decide === "Join"){
			
		var gamedetails = new GameDetails();
		gamedetails.set("userid",$rootScope.user.id);
		gamedetails.set("username",$rootScope.user.name);
		gamedetails.set("matchid",sharedProperties.getid());
		gamedetails.save(null, {
                            	success: function(match){
                            		$scope.players.push({name:$rootScope.user.name,id:$rootScope.user.id});
                            		$state.reload();
                            		},
                            	error: function(match, error) {
                                	alert("Server Error");
                                	}
                            	});
		$scope.decide ="Drop";
	}
	else if($scope.decide === "Drop")
	{
		var swtch=1;
		var query3 = new Parse.Query(GameDetails);
		//alert(query3);
		//alert($rootScope.user.id+","+sharedProperties.getid());
		query3.equalTo("userid",$rootScope.user.id);
		query3.equalTo("matchid",sharedProperties.getid());
		query3.find({
                            	success: function(match){
                            		//alert(match.id);
                            		match[0].destroy({
                            			success: function(myObject) {
                            			//
                            			for(var i=0;i<$scope.players.length;i++)
                            			{
                            				if($scope.players[i].id===$rootScope.user.id)
                            				{
                            					$scope.players.splice(i,1);
                            					$state.reload();
                            				}
                            			}
                            			swtch=2;
   										// The object was deleted from the Parse Cloud.
  										},
  											error: function(myObject, error) {
  											alert("err");
    								// The delete failed.
   									// error is a Parse.Error with an error code and message.
  									}
                            		});
                            		},
                            	error: function(match, error) {
                                	alert("Server Error");
                                	}
                            	});
		//if(swtch==1)
		//alert(swtch);
		{
			//alert($scope.players[0]);
			//alert($scope.players.indexOf({name:$rootScope.user.name,id:$rootScope.user.id}));
			//$scope.players.splice($scope.players.indexof($rootScope.user.name),1);
			$scope.decide ="Join";
		}
	}
		//$state.go($state.current, {}, {reload: true});
	}
})



.controller('LoginCtrl', function($ionicViewService,$scope,$state,$http, ngFB ) {
			 $ionicViewService.nextViewOptions({
    				disableBack: true
				});
			 Parse.initialize("TZI5mrqAtri1QUbijHS9wsvVWxaXz2o841Pyte8m", "wsp0XUEDEJAmnclSOPlK7LGYXwGTnYwZE3uQ5KDh");
          ngFB.init({appId: '1379246572398138'});
          $scope.doLogin = function () {
            ngFB.login({scope: 'email,read_stream,publish_actions'}).then(
                    function(response) {
                    	//alert(response);
                    	ngFB.api({
        							path: '/me',
        							params: {fields: 'id,name'}
    							}).then(
        						function (user) { 
        							var Userdetails= Parse.Object.extend("UserDetails");
        							var query = new Parse.Query(Userdetails);
        							query.equalTo("userid",user.id);
                                    query.find({
                                        success:function(obj){
                                            // alert("1 "+obj.length);
                                            // alert("2 "+obj[0]);
                                            // alert("3 "+obj);
                                            if(obj.length==0)
                                            {alert("yeah");
                                                var userdetails = new Userdetails();
                                                userdetails.set("username",user.name);
                                                userdetails.set("userid",user.id);
                                                userdetails.set("matchesplayed",0);
                                                userdetails.save(null, {
                                                success: function(match){
                                                    window.localStorage.setItem("store", user.id);
                                                    var keyname = window.localStorage.key(0);
                                                    window.localStorage.setItem("atkn", response.authResponse.accessToken);
                                                    var keyname1 = window.localStorage.key(1);
                                                    
                                                        $state.go('load');
                                                    
                                                    },
                                                error: function(match, error) {
                                                    alert("Server Error");
                                                    }
                                                });
                                            }
                                            else{
                                                window.localStorage.setItem("store", user.id);
                                                var keyname = window.localStorage.key(0);
                                                window.localStorage.setItem("atkn", response.authResponse.accessToken);
                                                var keyname1 = window.localStorage.key(1);
                                                
                                                        $state.go('load');
                                                   
                                            }
                                        },
                                        error:function(){
                                            alert("Login Error");
                                        }
                                    });
                    				
            						//$state.go('load');
        						},
        						function (error) {
            					alert('Facebook error: ' + error.error_description);
        						});
                    },
                    function(error) {
                        //alert('Facebook login failed: ' + error);
                    });

            
          };
          
})

.filter('geopoint', function() {
        return function(value) {
           var position={
           "latitude":value.latitude,
           "longitude":value.longitude
            };
           return position;
        };
    })
.service('sharedProperties', function () {
        var matchobjid = {};

        return {
            getid: function () {
                return matchobjid;
            },
            setid: function(value) {
                matchobjid = value;
            }
        };
    })
.controller('SportListCtrl', function($http,sharedProperties,$state,$timeout, $rootScope,$scope, $stateParams, uiGmapGoogleMapApi, uiGmapLogger) {
    Parse.initialize("TZI5mrqAtri1QUbijHS9wsvVWxaXz2o841Pyte8m", "wsp0XUEDEJAmnclSOPlK7LGYXwGTnYwZE3uQ5KDh");
    adbuddiz.showAd();
    $scope.number=0;
    $scope.center = {"latitude":-21,"longitude":23};
    $scope.markercord = {"latitude":-21,"longitude":23};
    //alert(query);{"latitude":-21,"longitude":23};
    $scope.matchlist=[];
    var Match= Parse.Object.extend("Match");
    //alert($rootScope.userCurrentLoc.lat);
    
    //query.greaterThanOrEqualTo("date",new Date());
     var dele=false;
    $scope.doRefresh=function(){
        $state.reload();
    }
    $scope.clicked=function(objID){
        if(dele!=true){
        sharedProperties.setid(objID);
        $state.go('app.gamedetails');
        }
        else
            dele=false;
    }
    $scope.delet=function(objID){
        
        dele=true;
        var quer = new Parse.Query(Match);
        
            quer.get(objID, {
                    success: function(object) {

                    object.destroy({success:function(obj){
                        
                        $state.reload();
                    },
                    error:function(){

                    }});
                    },

                    error: function(object, error) {
                    // error is an instance of Parse.Error.
                    }
            });

    }
    
    var match= new Match();
    //alert(match);
    var query = new Parse.Query(Match);
query.withinMiles("location",new Parse.GeoPoint({ latitude: $rootScope.userCurrentLoc.lat, longitude: $rootScope.userCurrentLoc.lng }),100);
var now = new Date();
query.greaterThanOrEqualTo("date",now);
    query.find({
        success: function(matches) {
            //$scope.matchlist=matches;
            //alert(matches.length);
            var mapmarker;
            var matchList=[];
            var location;
            var Game= Parse.Object.extend("Match");
            var gam= new Game();
            var locationname="";
             $scope.options = {
                      mapTypeControl: false
                      };
            for(var i=0;i<matches.length;i++)
            {
                ////
                        var dele=false;
                    if(matches[i].get("userid") === $rootScope.user.id)
                        dele=true;
                ////
                matchList.push({
                mapmarker:_.clone({
                                    id:i,
                                    coords:
                                    {
                                        latitude :matches[i].get("location").latitude,
                                        longitude:matches[i].get("location").longitude
                                    }},true),
                center:{
                        "latitude" :matches[i].get("location").latitude,
                        "longitude":matches[i].get("location").longitude
                       },
                gam:matches[i],
                sportname:matches[i].get("sportName"),
                matchID:matches[i].id,
                del:dele,
                options:{draggable:false,disableDefaultUI:true,zoomControl:false}
                })
            }
            $scope.matchlist=matchList;
            //$scope.load();
               // $state.reload();
            
        },
        error: function(error) {
         alert("Error: " + error.code + " " + error.message);
        }
      });
                               // Code here is always executed when entering this state
	//var query = new Parse.Query(Match);
})



.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'xxx',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
})

.controller('CreateGameCtrl', function(sharedProperties,$ionicModal,$window,$ionicViewService,$state,$filter,$http,$rootScope,$scope,$timeout, uiGmapGoogleMapApi, uiGmapLogger){
    $scope.butname="Save";
    console.log('Loading geoCtrl');

    var locationname="";
   	$scope.newGame={};
    $scope.matchlist=[];
    matchList=[];
    $scope.newGame.sportChoice="Football";
    uiGmapGoogleMapApi.then(function(maps) {
    	var lat=0,lng=0;
    	$scope.map = { center: { latitude: $rootScope.userCurrentLoc.lat, longitude: $rootScope.userCurrentLoc.lng }, zoom: 15 };
    	//$scope.map = { center: { latitude: -21, longitude: 123 }, zoom: 16 };
        console.log('map: ', maps);
      $scope.models = [];
    });
    var date=null,date1=null;
    $scope.saveGame=function(newGame){
        $scope.butname="...";
        matchList=[];
        date = new Date(newGame.gameDate);//$filter('date')(newGame.gameDate,'mediumDate')
        date1= new Date(newGame.gameDate);
        //alert(date);
        date1.setHours(23);
        date1.setMinutes(59);
        date1.setSeconds(59);
        //alert(newGame.gameTime.getHours());
        date.setHours(newGame.gameTime.getHours());
        date.setMinutes(newGame.gameTime.getMinutes());
        date.setSeconds(newGame.gameTime.getSeconds());
    	//alert($scope.map.center.latitude);
    	var GeoLoc= new Parse.GeoPoint({latitude:$scope.map.center.latitude,longitude:$scope.map.center.longitude});
        $http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+$scope.map.center.latitude+","+$scope.map.center.longitude)
                .success(function(res){
                    locationname=res.results[0].formatted_address;
                })
                .error(function(){
                });
    	var Match= Parse.Object.extend("Match");
    	var match= new Match();
       
            var querym=new Parse.Query(Match);
            querym.withinMiles("location",GeoLoc,5);
            querym.greaterThanOrEqualTo("date",new Date());
            querym.greaterThanOrEqualTo("date",date);
            querym.lessThanOrEqualTo("date",date1);
            querym.equalTo("sportName",newGame.sportChoice);
            querym.find({success:function(matches){
                if(matches.length!=0)
                {
                        $ionicModal.fromTemplateUrl('templates/existingGameList.html', {
                        scope: $scope,
                        animation: 'slide-in-up'
                        }).then(function(modal) {
                        $scope.modal = modal;
                        //alert(matches[0].get("sportName"));
                        for(var i=0;i<matches.length;i++)
                        {
                            matchList.push({
                                mapmarker:_.clone({
                                id:i,
                                coords:
                                    {
                                        latitude :matches[i].get("location").latitude,
                                        longitude:matches[i].get("location").longitude
                                    }},true),
                                center:{
                                        "latitude" :matches[i].get("location").latitude,
                                        "longitude":matches[i].get("location").longitude
                                    },
                                gam:matches[i],
                                sportname:matches[i].get("sportName"),
                                matchID:matches[i].id,
                                options:{draggable:false,disableDefaultUI:true,zoomControl:false}
                            })
                        }
                        $scope.matchlist=matchList;
                        $scope.clicked=function(objID){
                            $scope.modal.hide();
                            sharedProperties.setid(objID);
                            $state.go('app.gamedetails');
                            }
                        });
                        $timeout(function(){$scope.modal.show();},1500)
                        

                }
                else
                {
                    var time = $filter('date')(newGame.gameTime,'h:mm a');
                    match.set("sportName",newGame.sportChoice);
                    match.set("userid",$rootScope.user.id);
                    match.set("createdBy",$rootScope.user.name);
                    match.set("location",GeoLoc);
                    match.set("date",date);
                    match.set("time",time);
                    $timeout(function(){
                        match.set("locationname",locationname)
                        match.save(null, {
                    success: function(match){
                    // Execute any logic that should take place after the object is saved.
                    $scope.newGame={"sportChoice":"Football"};
                    alert("Saved!");
                    $ionicViewService.nextViewOptions({
                    disableBack: true
                    });
                    //$state.transitionTo('app.sportsList', $stateParams, { reload: true, inherit: true, notify: true });
                    //$controller('SportListCtrl');
                    //$route.reload();
                    $state.go('app.sportsList');
                    },
                    error: function(match, error) {
                    alert("Server Error");
                    }
                    });
                },1500);
                }

                
            },error:function(){

            }})

        $scope.closeModal=function(){
        $scope.modal.hide();
        //alert($filter('date')(newGame.gameDate,'mediumDate'));
    	
        //alert(date);
    	var time = $filter('date')(newGame.gameTime,'h:mm a');
    	match.set("sportName",newGame.sportChoice);
    	match.set("createdBy",$rootScope.user.name);
        match.set("userid",$rootScope.user.id);
    	match.set("location",GeoLoc);
    	match.set("date",date);
    	match.set("time",time);
        $timeout(function(){
            match.set("locationname",locationname)
            match.save(null, {
                    success: function(match){
                    // Execute any logic that should take place after the object is saved.
                    $scope.newGame={"sportChoice":"Football"};
                    alert("Saved!");
                    $ionicViewService.nextViewOptions({
                    disableBack: true
                    });
                    //$state.transitionTo('app.sportsList', $stateParams, { reload: true, inherit: true, notify: true });
                    //$controller('SportListCtrl');
                    //$route.reload();
                    $state.go('app.sportsList');
                    },
                    error: function(match, error) {
                    alert("Server Error");
                    }
                    });
                },1500);
        }
    }
})

.controller('load', function($ionicViewService,$http,ngFB,$rootScope,$timeout,$scope,$state,$ionicPlatform,cordovaGeolocationService) {
      adbuddiz.setAndroidPublisherKey("7a870a1d-139c-4cfb-b668-27223fbdc940");
      adbuddiz.cacheAds();



	$ionicViewService.nextViewOptions({
    disableBack: true
	});
$rootScope.existingGame=0;
$rootScope.userCurrentLoc={};
$rootScope.profpic;
$rootScope.matchesplayed=0;

ngFB.init({appId: '1379246572398138'});
Parse.initialize("TZI5mrqAtri1QUbijHS9wsvVWxaXz2o841Pyte8m", "wsp0XUEDEJAmnclSOPlK7LGYXwGTnYwZE3uQ5KDh");

ParsePushPlugin.register({appId:"TZI5mrqAtri1QUbijHS9wsvVWxaXz2o841Pyte8m", clientKey:"wsp0XUEDEJAmnclSOPlK7LGYXwGTnYwZE3uQ5KDh",eventKey:"myEventKey"}, //will trigger receivePN[pnObj.myEventKey]
function() {
    alert('successfully registered device!');

    ParsePushPlugin.saveInstallation(function(int a){alert(a);},function(){});
    
}, function(e) {
    alert('error registering device: ' + e);
});



var Userdetails= Parse.Object.extend("UserDetails");
                //var userdetails = new Userdetails();
                var query = new Parse.Query(Userdetails);
                
                
	cordovaGeolocationService.getCurrentPosition(function(position){
		var loc={};
    		loc.lat=position.coords.latitude;
            loc.lng=position.coords.longitude;
            $rootScope.userCurrentLoc=loc;
            //alert($rootScope.userCurrentLoc.lat);
            //alert(loc.lat+","+loc.lng);
            //$scope.map = { center: { latitude: -21, longitude: 32 }, zoom: 16 };
    	});
    
	//alert($rootScope.userCurrentLoc.latitude);
var actkn= window.localStorage.getItem("atkn");
//alert(actkn);
    	$http.get("https://graph.facebook.com/me?fields=id,name&access_token="+actkn)
		.success(function(user){$rootScope.user = user;
			},
        		function (error) {
            		alert('Facebook error: ' + error.error_description);
        		});
		
  $timeout(function() {
    
  	query.equalTo("userid",$rootScope.user.id);
  	query.find({success: function(object) {
    	$rootScope.matchesplayed=object[0].get("matchesplayed");
  	},

  error: function(object, error) {
    
  }});
  	//alert($rootScope.user.id);
		$rootScope.profpic="https://graph.facebook.com/"+$rootScope.user.id+"/picture?width=300&height=300";
      $state.go('app.sportsList');
    }, 5500);  
})

.service('HardwareBackButtonManager', function($ionicPlatform){
  this.deregister = undefined;
 
  this.disable = function(){ 
    this.deregister = $ionicPlatform.registerBackButtonAction(function(e){
  e.preventDefault();
  return false;
    }, 101);
  }
 
  this.enable = function(){
    if( this.deregister !== undefined ){
      this.deregister();
      this.deregister = undefined;
    }
  }
  return this;
});
