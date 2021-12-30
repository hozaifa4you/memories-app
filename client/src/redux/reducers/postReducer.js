import { FETCH_ALL_POST, CREATE_POST } from "../types/postTypes";

const reducer = (posts = [], action) => {
	switch (action.type) {
		// to fetch all the posts
		case FETCH_ALL_POST: {
			return action.payload;
		}
		// to create a new post
		case CREATE_POST: {
			return [...posts, action.payload];
		}
		// this is default case
		default: {
			return posts;
		}
	}
};

export default reducer;
