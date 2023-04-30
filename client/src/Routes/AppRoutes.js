import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Dashboard from "../Pages/Dashboard";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import MovieDetail from "../Pages/MovieDetail";
import Movies from "../Pages/Movies";
import Register from "../Pages/Register";

const AppRoutes = () => {
	return (
		<MainLayout>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/movies" element={<Movies />} />
				<Route path="/movie/detail/:id" element={<MovieDetail />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
		</MainLayout>
	);
};

export default AppRoutes;
