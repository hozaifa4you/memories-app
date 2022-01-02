import mongoose from "mongoose";

const postSchema = mongoose.Schema(
	{
		name: String,
		title: String,
		message: String,
		creator: String,
		tags: [String],
		selectedFile: String,
		likes: { type: [String], default: [] },
	},
	{ timestamps: true }
);

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
