/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require("request");

// const fetchMyIP = function (callback) {
//   // use request to fetch IP address from JSON API

//   let url = "https://api.ipify.org?format=json";

//   request(url, (error, response, body) => {
//     const IP = JSON.parse(body).ip;
//     // error can be set if invalid domain, user is offline, etc.
//     if (error) {
//       callback(error, null);
//       return;
//     }
//     // if non-200 status, assume server error
//     if (response.statusCode !== 200) {
//       const msg = `Status Code ${response.statusCode} when fetching IP. Response ${body}.`;
//       callback(Error(msg), null);
//       return;
//     }

//     callback(null, IP);
//   });
// };

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

const fetchCoordsByIP = function (ip, callback) {
  let url = `https://freegeoip.app/json/${ip}`;

  request(url, (error, response, body) => {
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
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function (coords, callback) {
  let url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    const data = JSON.parse(body).response;
    const responseTimes = data[2];
    callback(null, data);
  });
};

module.exports = { fetchISSFlyOverTimes };
