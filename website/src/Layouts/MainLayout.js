import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const MainLayout = ({ children }) => {
	return (
		<div>
			{/* <div id="preloader">
				<div id="loading-center">
					<div id="loading-center-absolute"></div>
				</div>
			</div> */}

			<Header />
			<div className="body-wrapper">{children}</div>
			<Footer />
		</div>
	);
};

export default MainLayout;
