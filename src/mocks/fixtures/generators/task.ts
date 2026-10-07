import type { Todo } from "../../../types.js";

export const generateTask = (
  id: number,
  userId: number,
  completed = false,
): Todo => ({
  id,
  completed,
  title: `Test user ${userId} - test task ${id}`,
  userId,
});
