import axios from "axios";

const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_API_END_POINT,
	headers: {
		"Content-Type": "application/json",
		accept: "application/json",
	},
});

export default axiosInstance;