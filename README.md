# Coding Challenge: User Dashboard Aggregator

Implement `getUserTaskSummaries()` in `index.js` to fetch users and todos and return a summary for each user.

## Running

Use Node.js 18 or later and run `node scripts/run.js`. The provided runner handles printing the result and reporting errors. You can use `async/await` inside the function.

## Endpoints

- Users: `https://jsonplaceholder.typicode.com/users`
- Todos: `https://jsonplaceholder.typicode.com/todos`

## Requirements

1. Fetch both datasets asynchronously.
2. Match each user's `id` to their todos' `userId`.
3. Count their completed todos as `completedCount`.
4. Collect the titles of their uncompleted todos as `pendingTasks`.
5. Set `displayName` to the user's `name` followed by their `company.name` in parentheses, for example `"Leanne Graham (Romaguera-Crona)"`. Every supplied user has a company name.

## Output

Return an array with this shape, using the user's `id` for `userId`:

```typescript
interface UserTaskSummary {
  userId: number;
  displayName: string;
  completedCount: number;
  pendingTasks: string[];
}
```
