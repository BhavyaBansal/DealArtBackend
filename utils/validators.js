const validateName = (name) => {
  const nameRegex = new RegExp(/[a-zA-Z][a-zA-Z]+[a-zA-Z]$/);
  return nameRegex.test(name);
};

const validateEmail = (email) => {
  const reg = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    "gm"
  );
  return reg.test(email);
};
const validatePassword = (password) => {
  const passreg = new RegExp(
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
  );
  return passreg.test(password);
};
module.exports = {
  validatePassword,
  validateEmail,
  validateName,
};
