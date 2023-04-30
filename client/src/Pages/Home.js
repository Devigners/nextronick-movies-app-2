import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackgroundImage2 from "../Assets/img/bg/ucm_bg02.jpg";
import axiosInstance from "../Config/axios";
import moment from "moment";

const Home = () => {
	const [movies, setMovies] = useState([]);

	const getMovies = async () => {
		try {
			const res = await axiosInstance.get("/movies");
			setMovies(res.data.data);
		} catch (error) {}
	};

	useEffect(() => {
		getMovies();
	}, []);

	return (
		<main>
			<section
				className="ucm-area ucm-bg2"
				style={{
					backgroundImage: `url(${BackgroundImage2})`,
				}}
			>
				<div className="container">
					<div className="row align-items-end mb-55">
						<div className="col-lg-6">
							<div className="section-title title-style-three text-center text-lg-left">
								<h2 className="title">Latest Movies</h2>
							</div>
						</div>
					</div>
					<div className="ucm-active-two">
						<div className="row">
							{movies.map((item, index) => {
								return (
									<div className="col-xl-3 col-lg-4 col-sm-6 grid-item grid-sizer cat-two" key={index}>
										<div className="movie-item mb-60">
											<div className="movie-poster">
												<Link to={`/movie/detail/${item._id}`}>
													<img src={item.poster_path} alt="" />
												</Link>
											</div>
											<div className="movie-content">
												<div className="top">
													<h5 className="title">{item.title}</h5>
												</div>
												<div className="bottom">
													<ul>
														<li>
															<span className="quality">{item.genres[0]}</span>
														</li>
														<li>
															<span className="rating">
																<i className="fas fa-calendar-alt"></i> {moment(item.release_date).format("YYYY")}
															</span>
															<span className="rating">
																<i className="fas fa-thumbs-up"></i> {item.rating}
															</span>
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
						<div className="text-center">
							<Link to={"/movies"} className="btn btn-primary">
								View All
							</Link>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default Home;
