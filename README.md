# Coding Challenge: User Dashboard Aggregator

Implement `getUserTaskSummaries()` in `src/index.ts` to fetch users and todos and return a summary for each user. The input types are provided in `src/types.ts`.

## Running

Use Node.js 18 or later and run `npm run dev`. The provided runner handles printing the result and reporting errors. You can use `async/await` inside the function.

## Endpoints

- Users: `https://jsonplaceholder.typicode.com/users`
- Todos: `https://jsonplaceholder.typicode.com/todos`

## Requirements

1. Fetch both datasets asynchronously.
2. Associate each user with their tasks.
3. Include each user's identifier and a display label containing their name followed by their company name in parentheses. eg. "Joe Bloggs (Sainsbury's)"
4. Include the number of completed tasks for each user.
5. Include a list of the titles of their outstanding tasks.
6. Define a type for the returned summary and replace the function's `Promise<any>` with the appropirate return type.

Return an array containing one summary per user.
