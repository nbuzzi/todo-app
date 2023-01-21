const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

server.get("/health", (req, res) => res.jsonp({ status: "UP" }));

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.id = uuidv4();
    req.body.createdAt = Date.now();
  }
  next();
});

// Use default router
server.use(router);

const port = process.env.PORT || 3000;
server.listen(port, () =>
  console.log(`JSON Server is running in port ${port}`)
);
