import * as api from "../../api";
import { AUTH } from "../../redux/types/authTypes";

export const signin = (formData, history) => async dispatch => {
	try {
		history("/");
	} catch (error) {
		console.log(error);
	}
};

export const signup = (formData, history) => async dispatch => {
	try {
		history("/");
	} catch (error) {
		console.log(error);
	}
};
