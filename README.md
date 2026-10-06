# Coding Challenge: User Dashboard Aggregator

Implement `getUserTaskSummaries()` in `index.js` to fetch users and todos and return a summary for each user.

## Running

Use Node.js 18 or later and run `node scripts/run.js`. The provided runner handles printing the result and reporting errors. You can use `async/await` inside the function.

## Endpoints

- Users: `https://jsonplaceholder.typicode.com/users`
- Todos: `https://jsonplaceholder.typicode.com/todos`

## Requirements

1. Fetch both datasets asynchronously.
2. Associate each user with their tasks.
3. Include each user's identifier and a display label containing their name followed by their company name in parentheses. eg. "Joe Bloggs (Sainsbury's)"
4. Include the number of completed tasks for each user.
5. Include a list of the titles of their outstanding tasks.

Return an array containing one summary per user.
