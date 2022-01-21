const request = require("request");

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coordinates, (error, message) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, message);
      });
    });
  });
};

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchMyIP = function (callback) {
  // use request to fetch IP address from JSON API

  // let url = "https://api.ipify.org?format=json";

  request("https://api.ipify.org?format=json", (error, response, body) => {
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response ${body}.`;
      callback(Error(msg), null);
      return;
    }
    const IP = JSON.parse(body).ip;
    callback(null, IP);
  });
};

/**
 * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
 * Input:
 *   - The ip (ipv4) address (string)
 *   - A callback (to pass back an error or the lat/lng object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The lat and lng as an object (null if error). Example:
 *     { latitude: '49.27670', longitude: '-123.13000' }
 */
let IP = "99.229.241.42";
const fetchCoordsByIP = function (IP, callback) {
  // let url = `https://freegeoip.app/json/${ip}`;

  request(`https://freegeoip.app/json/${IP}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    // if non-200 status, send back an error message via callback
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP: ${body}.`;
      callback(Error(msg), null);
      return;
    }
    // send the latitude & longitude via callback
    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting responseTimes)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */

const coords = { latitude: "43.6567", longitude: "-79.34" };
const fetchISSFlyOverTimes = function (coords, callback) {
  // let url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(
    `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`,
    (error, response, body) => {
      // returns an error message for any nullable error
      if (error) {
        callback(error, null);
        return;
      }
      // returns an error message if the statuscode !== 200
      if (response.statusCode !== 200) {
        const msg = `Status code: ${response.statusCode}: when fetching ISS coordinates ${body}.`;
        callback(Error(msg), null);
        return;
      }
      // passes an array of response times to the callback
      const responseTimes = JSON.parse(body).response;
      callback(null, responseTimes);
    }
  );
};

module.exports = { nextISSTimesForMyLocation };
