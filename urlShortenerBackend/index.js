const express = require("express");
const cors = require("cors");
const { nanoid } = require("nanoid");

const app = express();
app.use(cors());
app.use(express.json());

const db = {}; // In-memory database

app.post("/shorten", (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const id = nanoid(6);
  db[id] = url;

  res.json({ shortUrl: `http://localhost:5000/${id}` });
});

app.get("/:id", (req, res) => {
  const originalUrl = db[req.params.id];
  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).send("URL not found");
  }
});

app.listen(5000, () => {
  console.log(" Server running at http://localhost:5000");
});
