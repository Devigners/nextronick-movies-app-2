import { createSlice } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_KEY } from "../Config/AppConstants";

// get token from local storage
let userData = localStorage.getItem(LOCAL_STORAGE_KEY) || null;
if (userData) {
	userData = JSON.parse(userData);
}

const initialState = {
	user: userData?.user || null,
	isAuth: userData?.user ? true : false,
	token: userData?.token || null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		userLoggedIn: (state, action) => {
			localStorage.setItem(
				LOCAL_STORAGE_KEY,
				JSON.stringify({
					user: action.payload.user,
					token: action.payload.token,
				})
			);
			state.user = action.payload.user;
			state.isAuth = true;
			state.token = action.payload.token;
		},
		userLoggedOut: (state) => {
			localStorage.removeItem(LOCAL_STORAGE_KEY);
			state.user = null;
			state.isAuth = false;
			state.token = null;
		},
	},
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
