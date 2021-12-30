import PostMessage from "../models/PostMessage.js";

class PostControllers {
	// you will get all posts
	async getPosts(req, res) {
		try {
			const postMessages = await PostMessage.find();
			return res.status(200).json(postMessages);
		} catch (error) {
			return res.status(404).json({ message: error.message });
		}
	}

	// create new post
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
}

export default new PostControllers();
