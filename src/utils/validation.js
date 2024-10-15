const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

const validateLoginData = (req) => {
  const { emailId, password } = req.body;

  if (!emailId || !password) {
    throw new Error("Please enter all credentials");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  }
};

const validateProfileEditData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "age",
    "gender",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed;
};

const validatePasswordEditData = (req) => {
  const allowedUpdates = ["password"];
  const { password } = req.body;
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedUpdates.includes(field)
  );
  if (isEditAllowed && !validator.isStrongPassword(password)) {
    throw new Error("Please Enter a strong password");
  }

  return isEditAllowed;
};

module.exports = {
  validateSignUpData,
  validateLoginData,
  validateProfileEditData,
  validatePasswordEditData
};
