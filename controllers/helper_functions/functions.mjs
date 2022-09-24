import User from "../../models/User.mjs";
import global_ENV from "dotenv";
global_ENV.config();
import jwt from "jsonwebtoken";

//  function that checks if user already exists or otherwise
export const existingUser = async (email) => {
  // try/catch block for db action
  try {
    // user_exist = null if user not found
    const user_exist = await User.findOne({ email }).exec();

    // stopping script from running further
    return user_exist;
  } catch (error) {
    return error;
  }
};

// validate signup form
export const validator = async (fname, lname, email, password) => {
  let error = false;

  // validating fname
  if (fname !== undefined) {
    if (fname.length < 3)
      return (error = "First Name must be at least 3 characters long.");

    if (fname.length >= 30)
      return (error = "First Name must not be longer than 30 characters.");
  }

  // validating lname
  if (lname !== undefined) {
    if (lname.length < 3)
      return (error = "Last Name must be at least 3 characters long.");
    if (lname.length >= 30)
      return (error = "Last Name must not be longer than 30 characters.");
  }

  // validating password
  if (password !== undefined) {
    if (password.length <= 6)
      return (error = "Password must be at least 6 characters long.");
  }

  // validating email
  if (email !== undefined) {
    if (email.length <= 0) {
      return (error = "User cannot register without email.");
    } else {
      // regex for validating email
      const email_regex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      // checking if email is valid or otherwise
      if (!email.match(email_regex))
        return (error = "Please enter a valid email.");
    }
  }

  return error;
};

// JWT tokens generator
export const user_jwt = () => {
  const secret_key = process.env.JWT_SECRET_KEY
  const token = jwt.sign
}