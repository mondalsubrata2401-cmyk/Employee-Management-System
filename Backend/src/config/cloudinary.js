// // import { v2 as cloudinary } from "cloudinary"; //! Cloudinary is being required
// const cloudinary = require("cloudinary").v2;

// export function cloudinaryConnect() {
// 	try {
// 		cloudinary.config({
// 			//!    ########   Configuring the Cloudinary to Upload MEDIA ########
// 			cloud_name: process.env.CLOUD_NAME,
// 			api_key: process.env.API_KEY,
// 			api_secret: process.env.API_SECRET,
// 		});
// 	} catch (error) {
// 		console.log(error);
// 	}
// }



const cloudinary = require("cloudinary").v2;
require('dotenv').config();

exports.cloudinaryConnect = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET, 
        });
    } catch (err) {
        console.error("Cloudinary connection failed:", err);
    }
};
