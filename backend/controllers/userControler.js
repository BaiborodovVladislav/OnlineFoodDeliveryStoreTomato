import userModal from "../models/userModal.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { toast } from "react-toastify";

// login user

const loginUser = async (req, res) => {

	const { email, password } = req.body;

	try {

		// checking if user exists
		const user = await userModal.findOne({ email });
		if (!user) {
			return res.json({ success: false, message: "User does not exist" });
		}

		// checking if all fields are filled
		if (!email || !password) {
			return res.json({ success: false, message: "Please fill all fields" });
		}

		// checking if password is correct
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.json({ success: false, message: "Invalid credentials" });
		}

		// creating token
		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
		res.json({ success: true, token });

	} catch (error) {
		toast.error(error.message);
		res.json({ success: false, message: error.message });
	}
}

//register user

const createToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET);
}

const registerUser = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		// checking if all fields are filled
		if (!name || !email || !password) {
			return res.json({ success: false, message: "Please fill all fields" });
		}

		// checking if user already exists
		const exists = await userModal.findOne({ email });
		if (exists) {
			return res.json({ success: false, message: "User already exists" });
		}

		// validating email format && strong password
		if (!validator.isEmail(email)) {
			return res.json({ success: false, message: "Invalid email format" });
		}
		if (password.length < 8 || password.length > 20) {
			return res.json({ success: false, message: "Password must be strong" });
		}

		// hashing password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const newUser = new userModal({ name: name, email: email, password: hashedPassword });

		// saving user
		const user = await newUser.save();
		const token = createToken(user._id);
		res.json({ success: true, token });
		// res.json({ success: true, message: "User created" });

	} catch (error) {
		toast.error(error.message);
		res.json({ success: false, message: error.message });
	}
}


export { loginUser, registerUser };