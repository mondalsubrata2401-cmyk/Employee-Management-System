const express = require("express")
const dbconnect =require("./config/database")
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cloudinary = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
require("dotenv").config()
const path=require("path");

const app = express();
app.use(express.json());
app.use(cookieParser());

// const __dirname = path.resolve();

// Setting up port number
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
  "http://localhost:3000",//frontend port
  "http://localhost:5173",
  "http://localhost:5174",
]

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
  })
)

app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});


const InitlizeConnection = async()=>{

    try{
        await dbconnect();
        console.log("connected to MongoDB");
        await cloudinary.cloudinaryConnect();
        console.log("connected to Cloudinary");
        app.listen(PORT, () => {
            console.log(`Listening at port ${PORT} `);
        })
    }
    catch(err){
        console.log("Error "+err);
    }
}

InitlizeConnection();
