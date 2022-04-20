const express = require("express");
const path = require("path");
const fs = require("fs/promises");
const PORT = process.env.PORT ?? 5555;
const app = express();

app.use(express.static(path.resolve(__dirname, "testSite")));
const logsPath = path.resolve(__dirname, "testSite/logs/", "logs.txt");

app.get("/", async (req, res) => {
  const data = await fs.readFile(logsPath, "utf-8");
  const logs = data.split("\r\n").filter((i) => !!i);
  res.render("index", { logs });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT} ...`));
