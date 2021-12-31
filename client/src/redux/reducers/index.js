import { combineReducers } from "redux";

import PostReducer from "./postReducer";
import authenticationReducer from "./authenticationReducer";

export default combineReducers({
	Posts: PostReducer,
	Authentication: authenticationReducer,
});
