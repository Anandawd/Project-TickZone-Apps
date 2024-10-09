const {
  createOrganizers,
  createUsers,
  getAllUsers,
} = require("../../../services/mongoose/users");

const { StatusCodes } = require("http-status-codes");

const getCmsAllUsers = async (req, res, next) => {
  try {
    const result = await getAllUsers(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

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
  getCmsAllUsers,
};
