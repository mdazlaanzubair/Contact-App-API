import User from "../../models/User.mjs";
import global_ENV from "dotenv";
global_ENV.config();
import jwt from "jsonwebtoken";

// grabbing secret key from the env file
const secret_key = process.env.JWT_SECRET_KEY;

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
export const validator = async ({
  fname,
  lname,
  email,
  password,
  token,
  gender,
  bio,
  contact,
}) => {
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

  // validating token
  if (token !== undefined) {
    if (lname.length < 0)
      return (error = "Last Name must be at least 3 characters long.");
  }

  // validating gender
  if (gender !== undefined) {
    if (isNaN(gender) || parseInt(gender) < 0 || parseInt(gender) > 2)
      return (error = "Invalid gender, please select right gender.");
  }

  // validating bio
  if (bio !== undefined) {
    if (bio.length < 30)
      return (error = "Bio must be at least 30 characters long.");
    if (bio.length >= 200)
      return (error = "Bio must not be longer than 200 characters.");
  }

  // validating contact
  if (contact !== undefined) {
    // regex for validating contact
    const contact_regex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    // checking if contact is valid or otherwise
    if (contact.match(contact_regex)) {
      return error = "Invalid phone number.";
    }
  }

  return error;
};

// JWT tokens generator function
export const issue_jwt = (user) => {
  // generating token
  const token = jwt.sign({ id: user._id }, secret_key, { expiresIn: "2d" });

  // returning token
  return token;
};

// function to verify JWT tokens
export const verify_jwt = (token) => {
  return jwt.verify(token, secret_key, (err, userID) => {
    if (err) {
      return err.message;
    } else {
      return userID;
    }
  });
};
