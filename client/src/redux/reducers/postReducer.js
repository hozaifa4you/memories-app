import {
	FETCH_ALL_POST,
	CREATE_POST,
	UPDATE_POST,
	DELETE_POST,
	LIKE_POST,
} from "../types/postTypes";

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

		// update post and like post
		case UPDATE_POST:
		case LIKE_POST: {
			return posts.map(post =>
				post._id === action.payload._id ? action.payload : post
			);
		}

		//delete posts
		case DELETE_POST: {
			return posts.filter(post => post._id !== action.payload);
		}

		// this is default case
		default: {
			return posts;
		}
	}
};

export default reducer;
