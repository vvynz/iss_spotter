const { nextISSTimesForMyLocation } = require("./iss");

/**
 * Input:
 *   Array of data objects defining the next fly-overs of the ISS.
 *   [ { risetime: <number>, duration: <number> }, ... ]
 * Returns:
 *   undefined
 * Sideffect:
 *   Console log messages to make that data more human readable.
 *   Example output:
 *   Next pass at Mon Jun 10 2019 20:11:44 GMT-0700 (Pacific Daylight Time) for 468 seconds!
 */

const displayPT = function (passTimes) {
  for (const time of passTimes) {
    const timeStamp = new Date(0);
    timeStamp.setUTCSeconds(time.risetime);
    const duration = passTimes.duration;
    console.log(`${timeStamp} for ${duration} seconds.`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  // success! Print out the details
  displayPT(passTimes);
});

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Returned IP:", ip);
// });

// accepts the ip address as a string and a callback
// fetchCoordsByIP("99.229.241.42", (error, coords) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Returned coordinates:", coords);
// });

// const coordinates = { latitude: "43.6567", longitude: "-79.34" };

// fetchISSFlyOverTimes(coordinates, (error, message) => {
//   if (error) {
//     console.log("Invalid coordinates: ", error);
//     return;
//   }

//   console.log("It worked! Upcoming flyover times:", message);
// });
