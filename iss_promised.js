const request = require("request-promise-native");

// request a user's IP add from https://api.ipify.org
const fetchMyIP = function() { 
  // returns: Promise of request for the ip data, returned as JSON string
  return request('https://api.ipify.org?format=json');
};

// makes a request to https://freegeoip.app/ using the IP add, to get the lat & long
const fetchCoordsByIP = function(body) {
  const IP = JSON.parse(body).ip; //JSON parsed string containing the ip address
  return request(`https://freegeoip.app/json/${IP}`); //makes a request to the url and returns the promise from request
};

// request the geo coords from http://api.open-notify.org/
const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body); //gets geo data
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url); //returns Promise of request for fly over times as JSOn string
};

const nextISSTimesForMyLocation = function(body) {
  return fetchMyIP()
  .then(fetchCoordsByIP) //fetchCoordsByIP is a callback here using .then
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const { response } = JSON.parse(data);
    return response; //returns Promise for fly over data for user's location
  });
};


module.exports = { nextISSTimesForMyLocation };