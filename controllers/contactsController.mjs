import mongoose from "mongoose";
import Contact from "../models/Contact.mjs";
import { alreadyExist } from "./helper_functions/alreadyExist.mjs";
import { contactValidator } from "./helper_functions/contactValidator.mjs";

// Function that list all the contacts matches condition
// and send back to the client
export const index = async (req, res) => {
  // fetching all contacts from the database
  try {
    const contacts = await Contact.find({ isDeleted: false, userID: 123 }).sort(
      { createdAt: -1 }
    );

    // if no contact send this response
    if (!contacts || contacts.length === 0)
      return res.status(204).send({ success_msg: "No contacts." });

    // if contact send this response
    return res.status(200).send({ contacts, success_msg: "Your contacts." });
  } catch (error) {
    // sending when failed to fetch from the database
    console.log(error);
    return res.status(500).send({ err_msg: "Internal server error." });
  }
};

// Function that create new contact if doesn't exists already
export const create = async (req, res) => {
  // validate request body coming from client
  const errors = contactValidator(req.body);
  if (!errors || Object.keys(errors).length === 0)
    return res.status(400).send({ err_msg: errors });

  // if contact already exist
  const isExist = await alreadyExist(req.body.contact);
  if (isExist)
    return res.status(409).send({ err_msg: "Contact already exists." });

  // try/catch block for storing Contact to the database
  try {
    // creating new instance of the Contact
    const new_contact = new Contact(req.body);

    // saving to the database
    await new_contact.save();

    // sending when saved in the database
    return res
      .status(201)
      .send({ contact: new_contact, success_msg: "Contact saved." });
  } catch (error) {
    // sending when failed to save in the database
    console.log(error);
    return res.status(500).send({ err_msg: "Internal server error." });
  }
};

// Function that sends requested contact by the client
export const view = async (req, res) => {
  // validating contact id as per mongoose formate
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send({ err_msg: "Invalid contact ID." });

  try {
    // checking if database has the requested contact
    const contact = await Contact.findById(req.params.id);
    if (!contact || Object.keys(contact).length === 0)
      return res.status(404).send({ err_msg: "Contact doesn't exist." });

    // if contact exist send it to the client
    return res
      .status(200)
      .send({ contact, success_msg: "Here is your contact." });
  } catch (error) {
    // sending when failed to fetch from the database
    console.log(error);
    return res.status(500).send({ err_msg: "Internal server error." });
  }
};

// Function that updates requested contact by the client
export const update = async (req, res) => {
  // validating contact id as per mongoose formate
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send({ err_msg: "Invalid contact ID." });

  // validate request body coming from client
  const errors = contactValidator(req.body);
  if (!errors || Object.keys(errors).length === 0)
    return res.status(400).send({ err_msg: errors });

  // updating the contact document in mongoDB
  try {
    // checking if database has the requested contact - update
    const contact = await Contact.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    );

    // if requested contact doesn't exist
    if (!contact || Object.keys(contact).length === 0)
      return res.status(404).send({ err_msg: "Contact doesn't exist." });

    // if requested contact exists
    return res.status(201).send({ contact, success_msg: "Contact updated." });
  } catch (error) {
    // sending when failed to update in the database
    console.log(error);
    return res.status(500).send({ err_msg: "Internal server error." });
  }
};

// Function that deletes requested contact by the client
// due to modern development techniques the data is
// not actually deleting instead its flagged as "isDeleted"
export const destroy = async (req, res) => {
  // validating contact id as per mongoose formate
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send({ err_msg: "Invalid contact ID." });

  // updating the contact document in mongoDB
  try {
    // checking if database has the requested contact - update
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    // if requested contact doesn't exist
    if (!contact || Object.keys(contact).length === 0)
      return res.status(404).send({ err_msg: "Contact doesn't exist." });

    // if requested contact exists
    return res.status(200).send({ success_msg: "Contact deleted." });
  } catch (error) {
    // sending when failed to update in the database
    console.log(error);
    return res.status(500).send({ err_msg: "Internal server error." });
  }
};
