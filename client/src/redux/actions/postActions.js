import * as api from "../../api";
import { FETCH_ALL_POST, CREATE_POST } from "./../types/postTypes";

export const getPosts = () => async dispatch => {
	try {
		const { data } = await api.fetchPosts();
		dispatch({ type: FETCH_ALL_POST, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const createPost = post => async dispatch => {
	try {
		const { data } = await api.createPost(post);

		dispatch({ type: CREATE_POST, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};
