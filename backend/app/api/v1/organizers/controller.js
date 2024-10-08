const {
  createOrganizers,
  createUsers,
} = require("../../../services/mangoose/users");

const { StatusCodes } = require("http-status-codes");

const createCmsOrganizer = async (req, res, next) => {
  try {
    const result = await createOrganizers(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const createCmsUser = async (req, res, next) => {
  try {
    const result = await createUsers(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCmsOrganizer,
  createCmsUser,
};
