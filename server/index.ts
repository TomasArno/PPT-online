import * as express from "express";
import * as cors from "cors";

const app = express();
const port = process.env.PORT || 2000;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`running server on port ${port}`);
});
