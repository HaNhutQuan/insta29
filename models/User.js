const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
      fullname: {
            type: String,
            required: true,
            trim: true,
            maxlength: 25
      },
      username: {
            type: String,
            required: true,
            trim: true,
            maxlength: 25,
            unique: true,
      },
      email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
      },
      password: {
            type: String,
            required: true,
            minlength: 8,
      },
      avatar: {
            type: String,
            default: "https://res.cloudinary.com/diimgquir/image/upload/v1652000820/default_avatar_jaunkk.jpg",
      },
      followers: [{
            type: mongoose.Types.ObjectId, 
            ref: "User"
      }],
      following: [{
            type: mongoose.Types.ObjectId, 
            ref: "User"
      }],
      savePost: [{
            type: mongoose.Types.ObjectId,
            ref: "User"
      }]
     
}, {
      timestamps: true
});

module.exports = mongoose.model("User", userSchema);