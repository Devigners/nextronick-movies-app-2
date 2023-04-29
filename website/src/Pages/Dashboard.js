import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BackgroundImage2 from "../Assets/img/bg/breadcrumb_bg.jpg";
import { userLoggedOut } from "../Store/authSlice";
import { toast } from "react-hot-toast";

const Dashboard = () => {
	const { isAuth, user } = useSelector((s) => s.auth);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (!isAuth && !user) {
			navigate("/login");
		}
	}, [isAuth, user]);

	const onClickLogout = () => {
		toast.success("Logged Out Successfully");
		dispatch(userLoggedOut());
	};

	if (!isAuth && !user) {
		return null;
	}

	return (
		<section
			className="breadcrumb-area breadcrumb-bg"
			style={{
				backgroundImage: `url(${BackgroundImage2})`,
			}}
		>
			<div className="container">
				<div className="row mb-5">
					<div className="col-12">
						<div className="breadcrumb-content">
							<h2 className="title">
								Welcome <span>{`${user.first_name} ${user.last_name}`}</span>
							</h2>
							<nav aria-label="breadcrumb">
								<ol className="breadcrumb">
									<li className="breadcrumb-item">
										<Link href="/">Home</Link>
									</li>
									<li className="breadcrumb-item active" aria-current="page">
										Dashboard
									</li>
								</ol>
							</nav>
						</div>
					</div>
				</div>
				<div className="row align-items-center justify-content-center">
					<div className="col-lg-5">
						<div
							className="theme-form text-white text-center"
							style={{
								position: "relative",
								zIndex: "1",
							}}
						>
							<div className="mb-5">Email: {user.email}</div>

							<button onClick={onClickLogout} className="btn mb-0">
								Logout
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Dashboard;
