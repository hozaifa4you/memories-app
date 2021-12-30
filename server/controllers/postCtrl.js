import mongoose from "mongoose";

import PostMessage from "../models/PostMessage.js";

class PostControllers {
	// you will get all posts by @get
	async getPosts(req, res) {
		try {
			const postMessages = await PostMessage.find();
			return res.status(200).json(postMessages);
		} catch (error) {
			return res.status(404).json({ message: error.message });
		}
	}

	// create new post by @post
	async createPost(req, res) {
		const post = req.body;
		try {
			const newPost = new PostMessage(post);
			await newPost.save();
			res.status(201).json(newPost);
		} catch (error) {
			return res.status(409).json({ message: error.message });
		}
	}

	// update post by @patch
	async updatePost(req, res) {
		const { id: _id } = req.params;
		const post = req.body;

		try {
			if (!mongoose.Types.ObjectId.isValid(_id))
				return res.status(404).json({ mongoose: "No Post with the id" });

			const updatedPost = await PostMessage.findByIdAndUpdate(
				_id,
				{ ...post, _id },
				{
					new: true,
				}
			);
			res.status(200).json(updatedPost);
		} catch (error) {
			return res.status().json({ message: error.message });
		}
	}
}

export default new PostControllers();
