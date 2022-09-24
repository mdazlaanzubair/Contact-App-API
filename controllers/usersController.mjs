import User from "../models/User.mjs";
import bcrypt from "bcryptjs";
import { validator, existingUser } from "./helper_functions/functions.mjs";

export const list_users = (req, res) => {
  res.send("List of registered users.");
};

export const add_user = async (req, res) => {
  // destructuring the req.body
  const { fname, lname, email, password } = req.body;

  // creating avatar img url
  const avatar = `https://ui-avatars.com/api/?name=${
    fname.split(" ")[0]
  }+${lname}&&background=random`;

  // validating input before saving to the database
  const isError = await validator(fname, lname, email, password);

  // if validator gives error send it in response
  // else save data in the database and send success response
  if (isError === false) {
    // checking if user already exist or otherwise
    const isUserExist = await existingUser(email);

    // if user does not exist just create user
    if (isUserExist === null) {
      // creating new User object
      const new_user = new User({
        email,
        fname,
        lname,
        avatar,
        password: bcrypt.hashSync(password),
        username: `user_${new Date().valueOf()}`,
      });

      // try/catch block for data storing action
      try {
        // saving user to the database
        await new_user.save();

        // removing password from object and return it to client
        // ._doc is used to get only document from the db returned get_user
        const { password, ...user } = new_user._doc;

        // sending success response to the client
        res.status(201).send({
          user,
          message: "User is successfully registered.",
        });
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
      res.status(400).send("Email is already registered.");
    }
  } else {
    // sending errors in response
    res.status(400).send(isError);
  }

  // stopping script from running further
  return;
};

export const show_user = (req, res) => {
  res.send("View user data.");
};

export const edit_user = (req, res) => {
  res.send("Update user data.");
};

export const delete_user = (req, res) => {
  res.send("Delete user.");
};
