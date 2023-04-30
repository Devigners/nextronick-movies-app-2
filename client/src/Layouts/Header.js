import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./../Assets/img/logo/logo.png";
import { useSelector } from "react-redux";

const Header = () => {
	const [searchText, setSearchText] = useState("");
	const navigate = useNavigate();
	const { isAuth } = useSelector((s) => s.auth);

	const onSubmit = (e) => {
		e.preventDefault();
		if (searchText) {
			navigate(`/movies?search=${searchText}`);
		} else {
			navigate(`/movies`);
		}
	};

	useEffect(() => {
		return () => {
			setSearchText("");
		};
	}, []);

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
													<form action="#" onSubmit={onSubmit}>
														<input
															type="text"
															placeholder="Find Favorite Movie"
															value={searchText}
															onChange={(e) => setSearchText(e.target.value)}
														/>
														<button>
															<i className="fas fa-search" />
														</button>
													</form>
												</div>
											</li>
											{isAuth ? (
												<li className="header-btn">
													<Link to="/dashboard" className="btn">
														Dashboard
													</Link>
												</li>
											) : (
												<li className="header-btn">
													<Link to="/login" className="btn">
														Sign In
													</Link>
												</li>
											)}
										</ul>
									</div>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
