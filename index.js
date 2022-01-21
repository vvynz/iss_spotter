const { error } = require("console");
const { nextISSTimesForMyLocation } = require("./iss");

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  // success! Print out the details
  console.log(passTimes);
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

// const coordinates = { latitude: "aaa", longitude: "-79.34" };

// fetchISSFlyOverTimes(coordinates, (error, message) => {
//   if (error) {
//     console.log("Invalid coordinates: ", error);
//     return;
//   }

//   console.log("It worked! Upcoming flyover times:", message);
// });
