import { Verifier } from "@pact-foundation/pact";
import { app } from "./backend";
import path from "path";
import { Server } from "http";
import { todos } from "./todos";

describe("App", () => {
  const port = 8080;
  let verifier: Verifier;
  let server: Server;

  beforeAll(async () => {
    verifier = new Verifier({
      providerBaseUrl: `http://localhost:${port}`,
      provider: "backend",
      // In real applications you would probably use a Pact Broker instead.
      // If using local file remember to resolve the absolute path.
      pactUrls: [path.resolve("../frontend/pact/pacts/frontend-backend.json")],
      stateHandlers: {
        "Todo list is set": () =>
          new Promise((resolve) => {
            todos.push(
              { description: "Buy groceries" },
              { description: "Do laundry" }
            );
            resolve(true);
          }),
      },
    });

    server = app.listen(port);
  });

  it("should provide the api", async () => {
    await verifier.verifyProvider();
  });

  afterAll(() => {
    server.close();
  });
});
