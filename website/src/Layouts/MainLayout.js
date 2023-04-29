import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const MainLayout = ({ children }) => {
	const navigate = useNavigate();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [navigate]);

	return (
		<div>
			<Header />
			<div className="body-wrapper">{children}</div>
			<Footer />
		</div>
	);
};

export default MainLayout;
