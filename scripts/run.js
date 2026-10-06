const { getUserTaskSummaries } = require("../dist/index.js");

/**
 * Provided runner: no changes needed here.
 * Prints your solution's result and reports errors.
 */
getUserTaskSummaries()
  .then((result) => {
    console.log("Task Summaries processed!");
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
