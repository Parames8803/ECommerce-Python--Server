const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, "mysecretkey", { expiresIn: "1d" });
  return token;
};

const verifyToken = (token) => {
  const decoded = jwt.verify(token, "mysecretkey");
  return decoded;
};

module.exports = {
  generateToken,
  verifyToken,
};
