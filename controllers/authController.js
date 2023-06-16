const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
  // Register
  registerUser: async (req, res) => {
    // Examine the password length
    if (req.body.password.length > 7) {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);

        // Create new user
        const newUser = await new User({
          fullname: req.body.fullname,
          username: req.body.username,
          email: req.body.email,
          password: hashed,
        });
        // Generate access token
        const access_token = createAccessToken({ id: newUser._id });
        // Generate refresh token
        const refresh_token = createRefreshToken({ id: newUser._id });
        // STORE REFRESH TOKEN IN COOKIE
        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/v1/refresh_token",
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
        });

        // Save user to database
        const saveUser = await newUser.save();

        return res.status(200).json({
          message: "Register Success!",
          access_token,
          user: {
            ...newUser._doc,
            password: "",
          },
        });
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }
    } else {
      return res.status(401).json({ message: "Must be 7 characters or more" });
    }
  },

  // Login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).populate(
        "followers following",
        "avatar username fullname followers following"
      );
      if (!user)
        return res.status(404).json({ message: "This email does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(404).json({ message: "Password is incorrect." });
      else if (user && isMatch) {
        // Generate access token
        const access_token = createAccessToken({ id: user._id });
        // Generate refresh token
        const refresh_token = createRefreshToken({ id: user._id });
        // STORE REFRESH TOKEN IN COOKIE
        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/v1/refresh_token",
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
        });
        res.status(200).json({
          message: "Login Success!",
          access_token,
          user: {
            ...user._doc,
            password: "",
          },
        });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  generateAccessToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ message: "Please login now." });

      jwt.verify(
        rf_token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          if (err)
            return res.status(400).json({ message: "Please login now." });

          const user = await User.findById(result.id)
            .select("-password")
            .populate(
              "followers following",
              "avatar username fullname followers following"
            );

          if (!user)
            return res.status(400).json({ message: "This does not exist." });

          const access_token = createAccessToken({ id: result.id });

          res.status(200).json({
            access_token,
            user,
          });
        }
      );
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      // Clear cookies when user logs out
      res.clearCookie("refreshtoken", { path: "/v1/refresh_token" });
      return res.status(200).json({ message: "Logged out successfully!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = authController;
