import Contact from "../../models/Contact.mjs";

export const alreadyExist = async (contact) => {
  try {
    // finding contact already listed in the database
    const alreadyExistContact = await Contact.findById({ contact });

    // if no-match
    if (!alreadyExistContact) return true;

    // else no-match
    return false;
  } catch (error) {
    // sending when failed to fetch from the database
    console.log(error);
  }
};
