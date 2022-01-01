import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import User from "../models/User.js";

class UserControllers {
	async signin(req, res) {
		const { email, password } = req.body;

		try {
			const existingUser = await User.findOne({ email });

			if (!existingUser)
				return res.status(404).json({ message: "User doesn't exist." });

			const isPasswordCorrect = await bcrypt.compare(
				password,
				existingUser.password
			);

			if (!isPasswordCorrect)
				return res.status(400).json({ message: "Invalid Credentials" });

			const token = jwt.sign(
				{
					email: existingUser.email,
					id: existingUser._id,
				},
				process.env.JWT_SECRET,
				{ expiresIn: "5h" }
			);

			res.status(200).json({ result: existingUser, token });
		} catch (error) {
			res.status(500).json({ message: "Something went wrong." });
		}
	}

	// sign up
	async signup(req, res) {
		const { email, password, firstName, lastName, confirmPassword } =
			req.body;

		try {
			const existingUser = await User.findOne({ email });

			if (existingUser)
				return res.status(404).json({ message: "User already exist." });

			if (password !== confirmPassword)
				return res
					.status(400)
					.json({ message: "Password doesn't matched" });

			const hashedPassword = await bcrypt.hash(password, 12);

			const result = await User.create({
				email,
				password: hashedPassword,
				name: `${firstName} ${lastName}`,
			});

			const token = jwt.sign(
				{ email: result.email, id: result._id },
				process.env.JWT_SECRET,
				{ expiresIn: "5h" }
			);

			res.status(201).json({ result, token });
		} catch (error) {
			res.status(500).json({ message: "Something went wrong." });
		}
	}
}

export default new UserControllers();
