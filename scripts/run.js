import { getUserTaskSummaries } from "../dist/index.js";

/**
 * Provided runner: no changes needed here.
 * Prints your solution's result and reports errors.
 */

try {
  await getUserTaskSummaries();
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}

console.log("Task Summaries processed!");
