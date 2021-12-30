import * as api from "../../api";
import {
	FETCH_ALL_POST,
	CREATE_POST,
	UPDATE_POST,
	DELETE_POST,
} from "./../types/postTypes";

export const getPosts = () => async dispatch => {
	try {
		const { data } = await api.fetchPosts();
		dispatch({ type: FETCH_ALL_POST, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const createPost = post => async dispatch => {
	try {
		const { data } = await api.createPost(post);

		dispatch({ type: CREATE_POST, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const updatePost = (id, post) => async dispatch => {
	try {
		const { data } = await api.updatePost(id, post);
		dispatch({ type: UPDATE_POST, payload: data });
	} catch (error) {
		console.error(error);
	}
};

export const deletePost = id => async dispatch => {
	try {
		await api.deletePost(id);
		dispatch({ type: DELETE_POST, payload: id });
	} catch (error) {
		console.log(error);
	}
};
