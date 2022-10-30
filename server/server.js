import { db } from "./Connection.js";
import { server } from "./app.js";
const port = process.env.PORT || 5000;

server.listen(port, () => {
  db();
  console.log("server running at port", port);
});
