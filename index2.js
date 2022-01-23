const { nextISSTimesForMyLocation } = require("./iss_promised");
const { displayPT } = require("./index");

nextISSTimesForMyLocation().then((passTimes) => {
  displayPT(passTimes);
})
.catch((error) => {
  console.log("It didn't work: ", error.message);
});

