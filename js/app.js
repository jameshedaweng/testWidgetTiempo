var TEST = [];
TEST.CityController = function($scope){
  $scope.cities = ['Madrid', 'Paris', 'Beijing'];
  $scope.addCity = function(){
    $scope.cities.push($scope.newCity);
    $scope.newCity = '';
  };
};

TEST.WeatherController = function($scope, $http){
  $scope.weather = [];
  $scope.city = '';
  $scope.weatherReady = false;
  $scope.showForecast = false;
  function getWeather(city, callback){
    $http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22' + city + '%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',{
      timeout: 1000
    })
    .success(callback)
    .error(function(){
      getWeather(city,callback);
    });
  };

  function pushWeather(data){
    if (data.query.results.channel.location.city){
      $scope.weather = data;
      $scope.weatherReady = true;
    }
  };

  $scope.init = function(city){
    $scope.city = city;
    getWeather($scope.city, pushWeather);
  };
};

TEST.weatherType = function() {
  return function(input) {
    input = input || '';
    var out = '';
    var weatherCodes = {
      0 : '11d',
      1 : '11d',
      2 : '11d',
      3 : '11d',
      4 : '11d',
      5 : '09d',
      6 : '09d',
      7 : '13d',
      8 : '09d',
      9 : '09d',
      10 : '09d',
      11 : '09d',
      12 : '09d',
      13 : '13d',
      14 : '13d',
      15 : '13d',
      16 : '13d',
      17 : '13d',
      18 : '13d',
      19 : '50d',
      20 : '50d',
      21 : '50d',
      22 : '50d',
      23 : '04d',
      24 : '04d',
      25 : '04d',
      26 : '04d',
      27 : '02n',
      28 : '02d',
      29 : '02n',
      30 : '02d',
      31 : '01n',
      32 : '01d',
      33 : '01n',
      34 : '01d',
      35 : '09d',
      36 : '01d',
      37 : '11d',
      38 : '11d',
      39 : '11d',
      40 : '09d',
      41 : '13d',
      42 : '13d',
      43 : '13d',
      44 : '03d',
      45 : '11d',
      46 : '13d',
      47 : '11d',
      3200 : '01d'
    };
    if (weatherCodes.hasOwnProperty(input)) {
      out = weatherCodes[input];
    }
    else{
      out = '01d';
    }
    return out;
  };
};

TEST.celsius = function() {
  return function(input){
    input = input || '';
    var out = '';
    out = Math.round((input-32)/1.8) + "°";
    return out;
  };
};

TEST.shortDate = function() {
  return function(input){
    input = input || '';
    var out = '';
    out = moment(input, "DD MMM YYYY").format("ddd DD");
    return out;
  };
};

angular.module('app', ['ngAnimate'])
.filter("weatherType", TEST.weatherType)
.filter("celsius", TEST.celsius)
.filter("shortDate", TEST.shortDate)
.controller("CityController", ['$scope', TEST.CityController])
.controller("WeatherController", ['$scope','$http', TEST.WeatherController]);