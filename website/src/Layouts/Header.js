import React from "react";
import Logo from "./../Assets/img/logo/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header className="header-style-two">
			<div id="sticky-header" className="menu-area">
				<div className="container custom-container">
					<div className="row">
						<div className="col-12">
							<div className="mobile-nav-toggler">
								<i className="fas fa-bars" />
							</div>
							<div className="menu-wrap">
								<nav className="menu-nav show">
									<div className="logo">
										<Link to="/">
											<img src={Logo} alt="Logo" />
										</Link>
									</div>
									<div className="navbar-wrap main-menu d-none d-lg-flex px-5">
										<ul className="navigation ml-0">
											<li>
												<Link to="/">Home</Link>
											</li>
											<li>
												<Link to="/movies">Movies</Link>
											</li>
										</ul>
									</div>
									<div className="header-action d-none d-md-block">
										<ul>
											<li className="d-none d-xl-block w-100">
												<div className="footer-search">
													<form action="#">
														<input type="text" placeholder="Find Favorite Movie" />
														<button>
															<i className="fas fa-search" />
														</button>
													</form>
												</div>
											</li>
											<li className="header-btn">
												<Link to="/login" className="btn">
													Sign In
												</Link>
											</li>
										</ul>
									</div>
								</nav>
							</div>
							{/* Mobile Menu  */}
							<div className="mobile-menu">
								<div className="close-btn">
									<i className="fas fa-times" />
								</div>
								<nav className="menu-box">
									<div className="nav-logo">
										<a href="index-2.html">
											<img src="img/logo/logo.png" alt="" title="" />
										</a>
									</div>
									<div className="menu-outer">
										{/*Here Menu Will Come Automatically Via Javascript / Same Menu as in Header*/}
									</div>
									<div className="social-links">
										<ul className="clearfix">
											<li>
												<a href="#">
													<span className="fab fa-twitter" />
												</a>
											</li>
											<li>
												<a href="#">
													<span className="fab fa-facebook-square" />
												</a>
											</li>
											<li>
												<a href="#">
													<span className="fab fa-pinterest-p" />
												</a>
											</li>
											<li>
												<a href="#">
													<span className="fab fa-instagram" />
												</a>
											</li>
											<li>
												<a href="#">
													<span className="fab fa-youtube" />
												</a>
											</li>
										</ul>
									</div>
								</nav>
							</div>
							<div className="menu-backdrop" />
							{/* End Mobile Menu */}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
