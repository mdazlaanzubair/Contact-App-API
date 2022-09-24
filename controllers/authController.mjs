import User from "../models/User.mjs";
import bcrypt from "bcryptjs";
import { validator } from "./helper_functions/functions.mjs";

// function to login the user
export const login = async (req, res) => {
  // destructuring the req.body
  const { email, password } = req.body;

  // validating input before saving to the database
  const isError = await validator(undefined, undefined, email, password);
  if (isError === false) {
    // try/catch block for performing database action
    try {
      // creating new User object
      let get_user = await User.findOne({ email });

      // matching password
      if (bcrypt.compareSync(password, get_user.password) === true) {
        // removing password from object and return it to client
        // ._doc is used to get only document from the db returned get_user
        const { password, ...user } = get_user._doc;

        // sending success response to the client
        res.status(200).send({
          user,
          message: "User is successfully logged in.",
        });
      } else {
        // sending errors in response
        res.status(400).send("Incorrect credentials.");
      }
    } catch (error) {
      // logging error in the server logs
      console.log(error);

      // sending error to the client
      res.status(500).send({
        error,
        message: "An error occurred while saving user in the data.",
      });
    }
  } else {
    // sending errors in response
    res.status(400).send(isError);
  }

  // stopping script from running further
  return;
};

// function to login the user after registering to the database
export const signup = async (req, res) => {
  res.send("Signup")
};
