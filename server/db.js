import mongoose from "mongoose";

export default function (CONNECTION_URL) {
	process.setMaxListeners(Infinity);
	mongoose
		.connect(CONNECTION_URL, { useNewUrlParser: true })
		.then(() => {
			console.log(`Database connected at: ${mongoose.connection.host}`);
		})
		.catch(err => {
			console.log(err.message);
		});
}
