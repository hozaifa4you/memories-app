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
			return res.status(500).json({ message: error.message });
		}
	}

	// delete posts
	async deletePost(req, res) {
		const { id } = req.params;

		try {
			if (!mongoose.Types.ObjectId.isValid(id))
				return res.status(404).json({ mongoose: "No Post with the id" });

			await PostMessage.findByIdAndRemove(id);

			res.status(200).json({ message: "Post deleted successfully" });
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}

	// like post
	async likePost(req, res) {
		const { id } = req.params;

		try {
			if (!req.userId) return res.json({ message: "Unauthenticated" });

			if (!mongoose.Types.ObjectId.isValid(id))
				return res.status(404).json({ mongoose: "No Post with the id" });

			const post = await PostMessage.findById(id);

			const index = post.likes.findIndex(id => id === String(req.userId));

			if (index === -1) {
				// like the post
				post.likes.push(req.userId);
			} else {
				/// delete the like
				post.likes = post.likes.filter(id => id !== String(req.userId));
			}

			const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
				new: true,
			});

			return res.status(200).json(updatedPost);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}
}

export default new PostControllers();
