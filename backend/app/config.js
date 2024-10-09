const dotenv = require("dotenv");
dotenv.config();

console.log("JWT Secret:", process.env.JWT_SECRET_KEY);
console.log(
  "JWT Refresh Token Expiration:",
  process.env.JWT_REFRESH_TOKEN_EXPIRATION
);
console.log(
  "JWT Refresh Token Secret:",
  process.env.JWT_REFRESH_TOKEN_SECRET_KEY
);

module.exports = {
  urlDb: process.env.URL_MONGODB_DEV,
  jwtExpiration: process.env.JWT_EXPIRATION || "24h",
  jwtSecret: process.env.JWT_SECRET_KEY || "defaultSecret",
  jwtRefreshTokenExpiration: process.env.JWT_REFRESH_TOKEN_EXPIRATION || "7d",
  jwtRefreshTokenSecret:
    process.env.JWT_REFRESH_TOKEN_SECRET_KEY || "defaultRefreshSecret",
  gmail: process.env.GMAIL,
  password: process.env.PASSWORD,
};
