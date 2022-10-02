export const contactValidator = (data) => {
  // error holder
  let errors = {};

  if (data.hasOwnProperty("fname")) {
    if (data.fname === "" || data.fname === " " || !data.fname) {
      errors.fname = "Contact must have a first name.";
    }
    if (data.fname.trim().length <= 3) {
      errors.fname = "Name must be 3 characters long.";
    }
    if (data.fname.trim().length > 30) {
      errors.fname = "Name must not be longer than 30 characters.";
    }
  } else {
    errors.fname = "Contact must have a first name.";
  }

  if (data.hasOwnProperty("contact")) {
    if (data.contact === "" || data.contact === " " || !data.contact) {
      errors.contact = "Contact number is required.";
    }
    if (data.contact.trim().length <= 2) {
      errors.contact = "Contact number must be 2 characters long.";
    }
  } else {
    errors.contact = "Contact number is required.";
  }

  if (data.hasOwnProperty("lname")) {
    if (data.lname.trim().length <= 3) {
      errors.lname = "Name must be 3 characters long.";
    }
    if (data.lname.trim().length > 30) {
      errors.lname = "Name must not be longer than 30 characters.";
    }
  }

  if (data.hasOwnProperty("email")) {
    const email_reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!data.email.match(email_reg) || data.email.match(email_reg) === null) {
      errors.email = "Invalid email.";
    }
  }

  if (data.hasOwnProperty("gender")) {
    const gender = ["Private", "Male", "Female"];
    if (!gender.includes(data.gender)) {
      errors.gender = "Invalid gender.";
    }
  }

  if (data.hasOwnProperty("relation")) {
    const relation = ["Friend", "Family", "Neighbor", "Colleague", "Stranger"];
    if (!relation.includes(data.relation)) {
      errors.relation = "Invalid relation.";
    }
  }

  if (data.hasOwnProperty("about")) {
    if (data.about.trim().length <= 20) {
      errors.about = "About must be a bit longer.";
    }
    if (data.about.trim().length >= 1200) {
      errors.about = "About is too long.";
    }
  }

  return errors;
};
