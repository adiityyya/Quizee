import jwt from "jsonwebtoken";


const generateTokenAndSetCookie = (email, res) => {
	// const token = jwt.sign({payload}, secretPrivatekey,{time})

	const token = jwt.sign({email}, process.env.JWT_SECRET,{expiresIn: "1h"});

	res.cookie("jwt", token, {
		maxAge: 60 * 60 * 1000, 
		httpOnly: true, // prevent XSS attacks cross-site scripting attacks
		sameSite: "strict", // CSRF attacks cross-site request forgery attacks
		secure: process.env.NODE_ENV !== "development",
	});
};
export default generateTokenAndSetCookie;