import { Schema, model } from "mongoose";

var contactSchema = new Schema(
  {
    userID: {
      type: String,
      required: [true, "Please login."],
    },
    fname: {
      type: String,
      required: [true, "Contact name is required."],
    },
    lname: {
      type: String,
      default: null,
    },
    relation: {
      type: String,
      default: "Stranger",
    },
    email: {
      type: String,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      default: null,
    },
    contact: {
      type: String,
      required: [true, "Contact number is required."],
      unique: [true, "Contact is already registered."],
    },
    gender: {
      type: String,
      default: "Private",
    },
    about: {
      type: String,
      max: [1200, "About is too long."],
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default model("Contact", contactSchema);
