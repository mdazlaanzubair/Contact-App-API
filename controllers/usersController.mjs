import User from "../models/User.mjs";
import bcrypt from "bcryptjs";
import {
  validator,
  existingUser,
  issue_jwt,
  verify_jwt,
} from "./helper_functions/functions.mjs";

export const index = (req, res) => {
  res.send({ message: "List of registered users." });

  // stopping script from running further
  return;
};

export const create = async (req, res) => {
  // destructuring the req.body
  const { fname, lname, email, password } = req.body;

  // creating avatar img url
  const avatar = `https://ui-avatars.com/api/?name=${
    fname.split(" ")[0]
  }+${lname}&&background=random`;

  // validating input before saving to the database
  const isError = await validator(fname, lname, email, password);

  // if validator throws error
  if (isError) res.status(400).send({ message: isError });

  // if validator throws no-error - false
  if (!isError) {
    // checking if user already exist or otherwise
    const isUserExist = await existingUser(email);

    // if user exist
    if (isUserExist)
      res.status(400).send({ message: "Email is already registered." });

    // if user does not exist
    if (!isUserExist) {
      // creating new User object
      const new_user = new User({
        email,
        fname,
        lname,
        avatar,
        password: bcrypt.hashSync(password),
        username: `user_${new Date().valueOf()}`,
      });

      // try/catch block for cloud storing action
      try {
        // saving user to the database
        await new_user.save();

        // generating token for newly signed up user
        const jwt_token = issue_jwt(new_user._doc);
        // sending success response to the client
        res.status(201).send({
          jwt_token,
          message: "User is successfully registered.",
        });
      } catch (error) {
        // logging error in the server logs
        console.log(error);

        // sending error to the client
        res.status(500).send({
          message: "Internal Server Error.",
        });
      }
    }
  }

  // stopping script from running further
  return;
};

export const view = async (req, res) => {
  // getting jwt from the request and verifying it
  const token = req.headers.authorization.split(" ")[1];
  const isVerified = verify_jwt(token);

  // if token does not verified - return unauthorized response
  if (isVerified === "invalid token")
    res.statue(401).send({
      message: "Invalid token, please login.",
    });

  // if token does verified - return user information in response
  if (isVerified !== "invalid token") {
    // fetch information and send to the client
    try {
      const user = await User.findById(isVerified.id, "-password");

      // if user not found - return Error - 404
      if (!user)
        res.statue(404).send({
          message: "User does not exist.",
        });

      // if user found - return user information
      if (user) {
        res
          .status(200)
          .send({ user, message: "User data successfully fetched." });
      }
    } catch (error) {
      // logging error in the server logs
      console.log(error);

      // sending error to the client
      res.status(500).send({
        error,
        message: "Internal Server Error.",
      });
    }
  }

  // stopping script from running further
  return;
};

export const update = async (req, res) => {
  // getting jwt from the request and verifying it
  const token = req.headers.authorization.split(" ")[1];
  const isVerified = verify_jwt(token);

  // if token does not verified - return unauthorized response
  if (isVerified === "invalid token")
    res.statue(401).send({
      message: "Invalid token, please login.",
    });

  // destructuring the req.body
  const { fname, lname, email, gender, bio, contact } = req.body;

  // validating input before saving to the database
  const isError = await validator(fname, lname, email, gender, bio, contact);

  // if validator throws error
  if (isError) res.status(400).send({ message: isError });

  // if validator throws no-error - false
  if (isVerified !== "invalid token" && !isError) {
    // fetch information and send to the client
    try {
      const user = await User.findByIdAndUpdate(
        { _id: isVerified.id },
        req.body // whole req.body is replaced with the db object
      );

      // if user not found - return Error - 404
      if (!user)
        res.statue(404).send({
          message: "User does not exist.",
        });

      // if user found - return user information
      if (user) {
        res
          .status(200)
          .send({ user, message: "User data successfully updated." });
      }
    } catch (error) {
      // logging error in the server logs
      console.log(error);

      // sending error to the client
      res.status(500).send({
        error,
        message: "Internal Server Error.",
      });
    }
  }

  // stopping script from running further
  return;
};

export const destroy = (req, res) => {
  res.send({ message: "Delete user." });

  // stopping script from running further
  return;
};
