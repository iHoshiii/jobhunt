import app from "./app.js";
import { serverPort } from "./config/environment.js";

app.listen(serverPort, "127.0.0.1", () => {
  console.log(`JobHunt API listening on http://127.0.0.1:${serverPort}`);
});
