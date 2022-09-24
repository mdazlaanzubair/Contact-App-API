// module imports
import express from "express";
import db_isConnected from "./db_connection/db_config.mjs";
import cors from "cors";

// routes import
import userRoutes from "./routes/usersRoutes.mjs";
import authRoutes from "./routes/authRoutes.mjs";

// express app initialization
const app = express();

// setting port for the server to run on
const port = process.env.PORT || 3000;

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
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// sending response to the client
app.get("/api", (req, res) => {
  res.send(`Hi there! Contact Lists Server listening on port ${port}`);
});
