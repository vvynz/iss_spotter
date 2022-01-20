const { error } = require("console");
const { fetchMyIP, fetchCoordsByIP } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Returned IP:", ip);
// });

fetchCoordsByIP("99.229.241.42", (error, coords) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log("It worked! Returned coordinates:", coords);
});
