const Users = require("../../api/v1/users/model");
const Organizers = require("../../api/v1/organizers/model");

const { BadRequestError } = require("../../errors");
const { StatusCodes } = require("http-status-codes");

const createOrganizers = async (req) => {
  const { organizer, email, password, confirmPassword, name, role } = req.body;

  if (password !== confirmPassword)
    throw new BadRequestError("Password tidak cocok");

  const result = await Organizers.create({ organizer });

  const users = await Users.create({
    email,
    name,
    password,
    role,
    organizer: result._id,
  });
  delete users._doc.password;

  return users;
};

const createUsers = async (req, res) => {
  const { email, password, confirmPassword, name, role } = req.body;

  if (password !== confirmPassword)
    throw new BadRequestError("Password tidak cocok");

  const result = await Users.create({
    email,
    password,
    name,
    role,
    organizer: req.user.organizer,
  });

  return result;
};

module.exports = {
  createOrganizers,
  createUsers,
};
