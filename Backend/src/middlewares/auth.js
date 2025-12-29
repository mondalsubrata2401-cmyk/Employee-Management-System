const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');


 //auth
exports.auth=async(req,res,next)=>{

    try{
        //extract token
		// console.log("can read you token")
		// console.log(req.headers.authorization)
        const token =
			req.cookies?.token ||                // safe access to cookies
			req.body?.token ||                   // safe access to body
			(req.headers?.authorization?.startsWith("Bearer ")  // safe access to header
				? req.headers.authorization.split(" ")[1]
				: null);

		// console.log(token);
        if(!token){
            return res.status(401).json({
                success:false,
                message: "Please login first",
            });
        }
        //verify token
        try{
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            console.log(decoded);
            req.user=decoded
            
        }
        catch(err){
            return res.status(401).json({
                success:false,
                message: "Invalid token",
            });
        }
        next(); 
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message: "Something went wrong: "+err.message,
        });
    }
}


//is Student
exports.isStudent = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });

		if (userDetails.accountType !== "Student") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Students",
			});
		}
		next();
	} catch (error) {
		return res.status(500).json({ success: false, message: `User Role Can't be Verified` });
	}
};
exports.isAdmin = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });

		if (userDetails.accountType !== "Admin") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Admin",
			});
		}
		next();
	} catch (error) {
		return res.status(500).json({ 
            success: false, 
            message: `User Role Can't be Verified` 
        });
	}
};
exports.isInstructor = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });
		console.log(userDetails);

		console.log(userDetails.accountType);

		if (userDetails.accountType !== "Instructor") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Instructor",
			});
		}
		next();
	} catch (error) {
		return res.status(500).json({ 
            success: false, 
            message: `User Role Can't be Verified`
        });
	}
};
