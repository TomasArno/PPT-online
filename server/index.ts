import * as express from "express";
import * as cors from "cors";
import * as path from "path";

const app = express();
const port = process.env.PORT || 2000;

app.use(express.json());
app.use(cors());

app.use(express.static("dist"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, () => {
  console.log(`running server on port ${port}`);
});
