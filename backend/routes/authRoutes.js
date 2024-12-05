import express from "express";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/genToken.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, confirmP } = req.body;

    if (password !== confirmP) {
      return res.status(400).json({ error: "Passwords don't match" });
    }
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // Generate JWT token here
      generateTokenAndSetCookie(newUser.email, res);

      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post('/login', async (req,res)=>{
    try{
        // console.log("hi login")
        const { email, password} = req.body;
        const user = await User.findOne({ email });

        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}
        generateTokenAndSetCookie(user.email, res);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
          });
    }
    catch(error){
        console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
});
router.post('/logout', async (req,res)=>{
  try {
		//just delete the jwt present in the cookie.
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} 
	catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
});
export default router;