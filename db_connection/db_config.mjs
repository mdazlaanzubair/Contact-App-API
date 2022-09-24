import mongoose from "mongoose";
import global_ENV from "dotenv";
global_ENV.config();

const db_name = "contact_list_app";
const db_url = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.nwbg8ps.mongodb.net/${db_name}`;

// connection to the database
const db_isConnected = mongoose
  .connect(db_url)
  .then(() => {
    // returning back with true status if db connected
    return true;
  })
  .catch((err) => {
    // creating custom error alert
    const separator = "==================================================\n";
    const msg = "There is an error while connecting to the database\n";

    // creating object containing error alert and message
    const error = {
      message: separator + msg + separator + "\n",
      err_msg: err,
    };

    // returning back with error if db not connected
    return error;
  });

export default db_isConnected;
