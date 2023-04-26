import React from "react";
import MainLayout from "../Layouts/MainLayout";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Movies from "../Pages/Movies";
import MovieDetail from "../Pages/MovieDetail";
import Dashboard from "../Pages/Dashboard";

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
