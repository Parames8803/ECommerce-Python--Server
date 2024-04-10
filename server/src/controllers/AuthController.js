const { hashPassword, comparePassword } = require("../helpers/hash");
const { generateToken } = require("../helpers/token");
const { User } = require("../db/user");

const AuthController = async (req, res) => {
  try {
    if (req.body.isLogin) {
      // login functionality
      // get the user credentials from the frontend
      const { email, password } = req.body;
      // check the user is already exists are not with the username
      // if not exists there is no user match found.
      const user = await User.findOne({ email: email });
      if (!user) {
        res.status(404).json({ message: "User not found" });
      }
      // if user exists matches the username compare the password with the
      // hashed password in the user model using helper
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: "Invalid password" });
      }
      // generating the token
      // if only the username and password matches
      // using the helper function and set the token in headers.
      const token = generateToken(user);
      // const expirationTime = new Date(Date.now() + 3600000);
      user.token = token;
      user.save();
      res.status(200).json({
        data: { username: user.username, token: user.token },
        message: "login sucessfully",
      });
    } else {
      // register functionality
      // get the user credentials from the frontend
      const { username, email, password } = req.body;

      // check the username which is already exists are not
      // if exists return the messsage username already exists.
      let checkUser = await User.find({
        $or: [{ username: username }, { email: email }],
      });
      if (checkUser.length > 0) {
        res.status(500).json({ message: "Credentials already exists" });
      } else {
        //hash the password using helper
        const hashedPassword = await hashPassword(password);
        // create the user by inserting the values from the frontend
        // includes the hashed password and roleid
        const user = await User.create({
          username: username,
          email: email,
          password: hashedPassword,
        });
        const token = generateToken(user);
        user.token = token;
        user.save();
        res.status(200).json({
          data: { username: user.username, token: user.token },
          message: "User registered successfully",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = AuthController;
