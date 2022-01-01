import mongoose from "mongoose";

export default async function (CONNECTION_URL) {
	process.setMaxListeners(Infinity);
	await mongoose
		.connect(CONNECTION_URL)
		.then(() => {
			console.log(`Database connected at: ${mongoose.connection.host}`);
		})
		.catch(err => {
			console.log(err.message);
		});
}
