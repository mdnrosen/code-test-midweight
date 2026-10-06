const USERS_URL = "https://jsonplaceholder.typicode.com/users";
const TASKS_URL = "https://jsonplaceholder.typicode.com/todos";

/**
 * Implement your solution here, replacing the placeholder return below.
 * Use the URLs above to fetch users and todos. You may add helper functions
 * above the export below. Keep this function's name and return the result.
 *
 * @returns {Promise<Array<{
 *   userId: number,
 *   displayName: string,
 *   completedCount: number,
 *   pendingTasks: string[]
 * }>>}
 */
async function getUserTaskSummaries() {
  // Your code here
  return [];
}

/**
 * Provided export: leave this unchanged.
 * Lets the runner and tests call your function.
 */
module.exports = { getUserTaskSummaries };
