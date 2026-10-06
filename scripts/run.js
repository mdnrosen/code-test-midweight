const { getUserTaskSummaries } = require("../index.js");

/**
 * Provided runner: no changes needed here.
 * Prints your solution's result and reports errors.
 */
getUserTaskSummaries()
  .then((result) => {
    console.log(JSON.stringify(result, null, 2));
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });