/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require("request");

const fetchMyIP = function (callback) {
  // use request to fetch IP address from JSON API

  let url = "https://api.ipify.org?format=json";

  request(url, (error, response, body) => {
    const IP = JSON.parse(body).ip;

    if (error) {
      callback(error, null);
    }

    callback(null, IP);
  });
};

module.exports = { fetchMyIP };
