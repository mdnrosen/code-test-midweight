const assert = require("node:assert/strict");
const { test, beforeEach, afterEach } = require("node:test");
const { getUserTaskSummaries } = require("../index.js");

const USERS_URL = "https://jsonplaceholder.typicode.com/users";
const TASKS_URL = "https://jsonplaceholder.typicode.com/todos";

const users = require("../data/users.json");
const tasks = require("../data/todos.json");

let originalFetch;
let requestedUrls;

beforeEach(() => {
  originalFetch = globalThis.fetch;
  requestedUrls = [];

  globalThis.fetch = async (url) => {
    assert.ok(url === USERS_URL || url === TASKS_URL, "Unexpected API URL");
    requestedUrls.push(url);
    return {
      ok: true,
      status: 200,
      json: async () => structuredClone(url === USERS_URL ? users : tasks),
    };
  };
});

afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("returns an array containing a summary for each of the ten users", async () => {
  const result = await getUserTaskSummaries();

  assert.ok(Array.isArray(result), "The result must be an array");
  assert.equal(result.length, 10, "Return a summary for each of the ten fixture users");
});

test("summarises Leanne Graham and Ervin Howell's tasks correctly", async () => {
  const result = await getUserTaskSummaries();

  assert.deepEqual(
    result.slice(0, 2),
    [
      {
        userId: 1,
        displayName: "Leanne Graham (Romaguera-Crona)",
        completedCount: 11,
        pendingTasks: [
          "delectus aut autem",
          "quis ut nam facilis et officia qui",
          "fugiat veniam minus",
          "laboriosam mollitia et enim quasi adipisci quia provident illum",
          "qui ullam ratione quibusdam voluptatem quia omnis",
          "illo expedita consequatur quia in",
          "molestiae perspiciatis ipsa",
          "et doloremque nulla",
          "dolorum est consequatur ea mollitia in culpa",
        ],
      },
      {
        userId: 2,
        displayName: "Ervin Howell (Deckow-Crist)",
        completedCount: 8,
        pendingTasks: [
          "suscipit repellat esse quibusdam voluptatem incidunt",
          "et itaque necessitatibus maxime molestiae qui quas velit",
          "adipisci non ad dicta qui amet quaerat doloribus ea",
          "nesciunt totam sit blanditiis sit",
          "laborum aut in quam",
          "repudiandae totam in est sint facere fuga",
          "earum doloribus ea doloremque quis",
          "sint sit aut vero",
          "porro aut necessitatibus eaque distinctio",
          "sunt cum tempora",
          "totam quia non",
          "doloremque quibusdam asperiores libero corrupti illum qui omnis",
        ],
      },
    ],
    "The first two summaries must match the supplied JSON responses",
  );
});

test("matches every user's display name including company, completed count, and pending task titles", async () => {
  const result = await getUserTaskSummaries();
  const completedCounts = [11, 8, 7, 6, 12, 6, 9, 11, 8, 12];

  users.forEach((user, index) => {
    assert.deepEqual(result[index], {
      userId: user.id,
      displayName: `${user.name} (${user.company.name})`,
      completedCount: completedCounts[index],
      pendingTasks: tasks.filter((task) => task.userId === user.id && !task.completed).map((task) => task.title),
    });
  });
});

test("fetches both the users and todos endpoints", async () => {
  await getUserTaskSummaries();

  assert.ok(requestedUrls.includes(USERS_URL), "Users must be fetched");
  assert.ok(requestedUrls.includes(TASKS_URL), "Tasks must be fetched");
});
