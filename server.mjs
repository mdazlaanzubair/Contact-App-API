import express from "express";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`Hi there! Contact Lists Server listening on port ${port}`);
});

app.listen(port, () => {
  console.log(`Contact Lists Server listening on port ${port}`);
});
