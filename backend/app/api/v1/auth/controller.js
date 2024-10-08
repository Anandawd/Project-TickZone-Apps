const { StatusCodes } = require("http-status-codes");
const { signin } = require("../../../services/mangoose/auth");

const loginCms = async (req, res, next) => {
  try {
    const result = await signin(req);

    res.status(StatusCodes.CREATED).json({
      data: { token: result },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  loginCms,
};
