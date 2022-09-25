import { Schema, model } from "mongoose";

var userSchema = new Schema(
  {
    avatar: {
      type: String,
      default: "https://ui-avatars.com/api/?name=X&&background=random",
    },
    username: {
      type: String,
      lowercase: true,
      required: [true, "Username can not be blank."],
      minLength: [6, "Username must be at least 6 characters long."],
      maxLength: [20, "Username must not be longer than 20 characters."],
      match: [
        /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
        "Invalid username",
      ],
      unique: [true, "Username is already taken."],
    },
    email: {
      type: String,
      required: [true, "User cannot register without email."],
      trim: true,
      lowercase: true,
      unique: [true, "Email is already registered."],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required to secure your account data."],
      minLength: [6, "Password must be at least 6 characters long."],
    },
    fname: {
      type: String,
      required: [true, "First Name can not be blank."],
      minLength: [3, "First Name must be at least 3 characters long."],
      maxLength: [30, "First Name must not be longer than 30 characters."],
    },
    lname: {
      type: String,
      required: [true, "Last Name can not be blank."],
      minLength: [3, "Last Name must be at least 3 characters long."],
      maxLength: [30, "Last Name must not be longer than 30 characters."],
    },
    gender: {
      type: Number,
      min: [0, "Invalid input"],
      max: [2, "Invalid input"],
      default: 0,
    },
    bio: {
      type: String,
      minLength: [30, "Bio must be at least 30 characters long."],
      maxLength: [200, "Bio must not be longer than 200 characters."],
      default: "Write something about yourself.",
    },
    contact: {
      type: String,
      default: "(+92)-XXX-XXXXXXXX",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default model("User", userSchema);
