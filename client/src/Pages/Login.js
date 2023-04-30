import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BackgroundImage2 from "../Assets/img/bg/breadcrumb_bg.jpg";
import axiosInstance from "../Config/axios";
import { userLoggedIn } from "../Store/authSlice";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isAuth } = useSelector((s) => s.auth);
	const { state } = useLocation();

	useEffect(() => {
		if (isAuth) {
			navigate("/dashboard");
		}
	}, [isAuth]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		switch (name) {
			case "email":
				setEmail(value);
				break;
			case "password":
				setPassword(value);
				break;
			default:
				break;
		}
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (!email || !password) {
			return toast.error("Please fill all the fields");
		}
		try {
			const res = await axiosInstance.post("/auth/login", {
				email,
				password,
			});

			if (res.status === 200) {
				dispatch(
					userLoggedIn({
						user: res.data.data,
						token: res.data.tokens,
					})
				);
				toast.success("Logged In Successfully");
				if (state?.from) {
					navigate(state.from);
					return;
				}
				navigate("/dashboard");
			}
		} catch (error) {
			const { response } = error;
			const { data } = response;
			toast.error(data.message);
		}
	};

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
								Sign <span>In</span>
							</h2>
							<nav aria-label="breadcrumb">
								<ol className="breadcrumb">
									<li className="breadcrumb-item">
										<Link href="/">Home</Link>
									</li>
									<li className="breadcrumb-item active" aria-current="page">
										Sign In
									</li>
								</ol>
							</nav>
						</div>
					</div>
				</div>
				<div className="row align-items-center justify-content-center">
					<div className="col-lg-5">
						<div
							className="theme-form"
							style={{
								position: "relative",
								zIndex: "1",
							}}
						>
							<form action="#" onSubmit={onSubmit}>
								<input
									name="email"
									value={email}
									onChange={handleInputChange}
									type="email"
									placeholder="Your Email *"
								/>
								<input
									name="password"
									value={password}
									onChange={handleInputChange}
									type="password"
									placeholder="You Password *"
								/>
								<button type="submit" className="btn">
									Login
								</button>
							</form>
							<p className="mt-3">
								If you don't have an account, please{" "}
								<Link className="text-primary" to="/register">
									Register.
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Login;
