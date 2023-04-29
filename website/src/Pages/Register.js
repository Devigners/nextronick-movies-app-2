import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BackgroundImage2 from "../Assets/img/bg/breadcrumb_bg.jpg";
import axiosInstance from "../Config/axios";

const Register = () => {
	const [first_name, setFirst_name] = useState("");
	const [last_name, setLast_name] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const { isAuth } = useSelector((s) => s.auth);

	useEffect(() => {
		if (isAuth) {
			navigate("/dashboard");
		}
	}, [isAuth]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		switch (name) {
			case "first_name":
				setFirst_name(value);
				break;
			case "last_name":
				setLast_name(value);
				break;
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
		if (!first_name || !last_name || !email || !password) {
			return toast.error("Please fill all the fields");
		}
		try {
			const res = await axiosInstance.post("/auth/register", {
				first_name,
				last_name,
				email,
				password,
			});

			if (res.status === 201) {
				toast.success("Registered Successfully");
				navigate("/login");
			}
		} catch (error) {
			const { response } = error;
			const { data } = response;
			toast.error(data.message);
		}
	};

	return (
		<div>
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
									Sign <span>Up</span>
								</h2>
								<nav aria-label="breadcrumb">
									<ol className="breadcrumb">
										<li className="breadcrumb-item">
											<Link href="/">Home</Link>
										</li>
										<li className="breadcrumb-item active" aria-current="page">
											Sign Up
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
										onChange={handleInputChange}
										value={first_name}
										name="first_name"
										type="text"
										placeholder="Your First Name *"
									/>
									<input
										onChange={handleInputChange}
										value={last_name}
										name="last_name"
										type="text"
										placeholder="Your Last Name *"
									/>
									<input
										onChange={handleInputChange}
										value={email}
										name="email"
										type="email"
										placeholder="Your Email *"
									/>
									<input
										onChange={handleInputChange}
										value={password}
										name="password"
										type="password"
										placeholder="You Password *"
									/>
									<button className="btn">Register</button>
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
		</div>
	);
};

export default Register;
