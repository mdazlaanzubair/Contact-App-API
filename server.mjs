// module imports
import express from "express";
import db_isConnected from "./db_connection/db_config.mjs";
import cors from "cors";

// express app initialization
const app = express();

// setting port for the server to run on
const port = process.env.PORT || process.env.LOCAL_PORT;

// checking db connection
db_isConnected.then((status) => {
  // if status is true start listening to the server
  if (status === true) {
    app.listen(port);
    console.log(
      `Database connected successfully! Server listening on port ${port}`
    );
  } else {
    // logging out the error msg with alert
    console.log(status.message); // alert
    console.log(status.err_msg); // error
  }
});

// middleware(s)
app.use(express.json());
app.use(cors());

// sending response to the client
app.get("/", (req, res) => {
  res.send(`Hi there! Contact Lists Server listening on port ${port}`);
});
