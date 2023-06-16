const User = require("../models/User");
const jwt = require("jsonwebtoken");

const middlewareController = {
  verifyToken: async (req, res, next) => {
    try {
      const token = req.header("Authorization");

      if (!token)
        return res.status(400).json({ msg: "Invalid Authentication." });

      const pattern = /^Bearer ((?:\.?(?:[A-Za-z0-9-_]+)){3})$/gm;
      const checkToken = pattern.test(token);

      if (!checkToken)
        return res.status(400).json({ msg: "Invalid Authentication." });

      // Ex: Bearer asdasd1123123sd  => ["Bearer", "asdasd1123123sd"]
      const accessToken = token.split(" ")[1];

      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      if (!decoded)
        return res.status(400).json({ msg: "Invalid Authentication." });

      const user = await User.findOne({ _id: decoded.id });

      req.user = user;
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

module.exports = middlewareController;
