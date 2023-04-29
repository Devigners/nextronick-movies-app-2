const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
	const { first_name, last_name, email, password } = req.body;

	if (!first_name || !last_name || !email || !password) {
		return res.status(400).json({
			message: "Please enter all fields",
		});
	}

	try {
		// find user by email
		const userExist = await User.findOne({ email });
		if (userExist) {
			return res.status(400).json({
				message: "User already exists",
			});
		}

		const user = new User({
			first_name,
			last_name,
			email,
			password,
		});
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		user.password = hash;
		await user.save();
		return res.status(201).json({
			message: "User created successfully",
			data: user,
		});
	} catch (err) {
		return res.status(500).json({
			message: "Something went wrong",
			error: err.message,
		});
	}
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({
			message: "Please enter all fields",
		});
	}

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(404).json({
				message: "Invalid Credentials",
			});
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (isMatch) {
			const tokens = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
			return res.status(200).json({
				message: "User logged in successfully",
				data: user,
				tokens,
			});
		}
		return res.status(404).json({
			message: "Invalid Credentials",
		});
	} catch (err) {
		return res.status(500).json({
			message: "Something went wrong",
			error: err.message,
		});
	}
});

router.get("/verify-token", async (req, res) => {
	return res.status(200).json({
		message: "Token is valid",
		data: req.user,
	});
});

router.put("/update", async (req, res) => {
	try {
		const { first_name, last_name, email, password } = req.body;
		const user = await User.findById(req.user._id);
		if (!user) {
			return res.status(404).json({
				message: "User not found",
			});
		}
		if (first_name) user.first_name = first_name;
		if (last_name) user.last_name = last_name;
		if (email) user.email = email;
		if (password) {
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);
			user.password = hash;
		}
		await user.save();
		return res.status(200).json({
			message: "User updated successfully",
			data: user,
		});
	} catch (err) {
		return res.status(500).json({
			message: "Something went wrong",
			error: err.message,
		});
	}
});

module.exports = router;
