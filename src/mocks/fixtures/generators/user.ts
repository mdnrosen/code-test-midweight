import type { User } from "../../../types.js";

export const generateUser = (id: number): Partial<User> => ({
  id,
  name: `Test User ${id}`,
});
