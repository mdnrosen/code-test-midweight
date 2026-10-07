import { http, HttpResponse } from "msw";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";
import { getUserTaskSummaries } from "./index.js";
import { server } from "./mocks/node.js";
import { generateUser } from "./mocks/fixtures/generators/user.js";
import { generateTask } from "./mocks/fixtures/generators/task.js";
import { Todo } from "./types.js";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Given the need to summarise user tasks", () => {
  const tasks: Todo[] = [];
  const user1id = 1;
  const users = [generateUser(user1id)];

  beforeEach(() => {
    server.use(
      http.get("https://jsonplaceholder.typicode.com/users", () => {
        return HttpResponse.json(users);
      }),
    );

    server.use(
      http.get("https://jsonplaceholder.typicode.com/todos", () => {
        return HttpResponse.json(tasks);
      }),
    );
  });

  afterEach(() => {
    tasks.length = 0;
    users.length = 1;
  });

  describe("When there is a single user", () => {
    it("Then it should return a single user task summary with the correct user details", async () => {
      tasks.push(generateTask(1, user1id, false));
      const response = await getUserTaskSummaries();

      expect(response).toHaveLength(1);
      expect(response[0].userId).toBe(1);
      expect(response[0].fullName).toBe("Test User 1");
    });

    describe("And the user has only one task", () => {
      describe("And the task is incomplete", () => {
        beforeEach(() => {
          tasks.push(generateTask(1, user1id, false));
        });

        it("Then the user summary should have a comletedCount of zero", async () => {
          const response = await getUserTaskSummaries();

          expect(response[0].completedCount).toBe(0);
        });

        it("Then the user summary should have the task in the pending tasks", async () => {
          const response = await getUserTaskSummaries();

          expect(response[0].pendingTasks).to.deep.equal([
            "Test user 1 - test task 1",
          ]);
        });
      });

      describe("And the task is complete", () => {
        beforeEach(() => {
          tasks.push(generateTask(1, user1id, true));
        });

        it("Then the user summary should have a completedCount of one", async () => {
          const response = await getUserTaskSummaries();

          expect(response[0].completedCount).toBe(1);
        });

        it("Then the user summary should not have the task in the pending tasks", async () => {
          const response = await getUserTaskSummaries();

          expect(response[0].pendingTasks).to.deep.equal([]);
        });
      });
    });

    describe("And the user has more than one task", () => {
      describe("And all the tasks are incomplete", () => {
        beforeEach(() => {
          tasks.push(generateTask(1, user1id, false));
          tasks.push(generateTask(2, user1id, false));
        });

        it("Then the user summary should have a completedCount of zero", async () => {
          const response = await getUserTaskSummaries();

          expect(response[0].completedCount).toBe(0);
        });

        it("Then the user summary should have all the tasks in the pending tasks", async () => {
          const response = await getUserTaskSummaries();

          expect(response[0].pendingTasks).to.deep.equal([
            "Test user 1 - test task 1",
            "Test user 1 - test task 2",
          ]);
        });
      });

      describe("And one of the tasks is complete", () => {
        beforeEach(() => {
          tasks.push(generateTask(1, user1id, true));
          tasks.push(generateTask(2, user1id, false));
        });

        it("Then the user summary should have a completedCount of one", async () => {
          const response = await getUserTaskSummaries();

          expect(response[0].completedCount).toBe(1);
        });

        it("Then the user summary should have all the incomplete tasks in the pending tasks", async () => {
          const response = await getUserTaskSummaries();

          expect(response[0].pendingTasks).to.deep.equal([
            "Test user 1 - test task 2",
          ]);
        });
      });

      describe("And all of the tasks are complete", () => {
        beforeEach(() => {
          tasks.push(generateTask(1, user1id, true));
          tasks.push(generateTask(2, user1id, true));
        });

        it("Then the user summary should have a completedCount of two", async () => {
          const response = await getUserTaskSummaries();

          expect(response[0].completedCount).toBe(2);
        });

        it("Then the user summary should have no tasks in the pending tasks", async () => {
          const response = await getUserTaskSummaries();

          expect(response[0].pendingTasks).to.deep.equal([]);
        });
      });
    });
  });

  describe("When there is more than one user", () => {
    const user2id = 2;

    beforeEach(() => {
      users.push(generateUser(user2id));
    });

    it("Then it should return all the user task summaries with the correct user details", async () => {
      tasks.push(
        generateTask(1, user1id, false),
        generateTask(2, user2id, false),
      );
      const response = await getUserTaskSummaries();

      expect(response).toHaveLength(2);
      expect(response[0].userId).toBe(1);
      expect(response[0].fullName).toBe("Test User 1");
      expect(response[1].userId).toBe(2);
      expect(response[1].fullName).toBe("Test User 2");
    });
  });
});
