const express = require("express");
const path = require("path");
const fs = require("fs/promises");
const PORT = process.env.PORT ?? 4455;
const app = express();

app.use(express.static(path.resolve(__dirname, "testSite")));
const homePagePath = path.resolve(__dirname, "testSite/", "index.html");

app.get("/", async (req, res) => {
  const data = await fs.readFile(homePagePath, "utf-8");
  res.render("index", { data });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT} ...`));
