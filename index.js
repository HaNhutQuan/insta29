const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const commentRoute = require("./routes/comment");
const { ExpressPeerServer } = require('peer')
const path = require('path')
const app = express();


dotenv.config();
mongoose.connect(process.env.DB_URL, () => {
      console.log("CONNECTED TO MONGO DB");
})

app.use(morgan("common"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/v1/", authRoute);
app.use("/v1/", userRoute);
app.use("/v1/", postRoute);
app.use("/v1/", commentRoute);


if (process.env.NODE_ENV === 'production') {
      app.use(express.static('client/build'))
      app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
      })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});