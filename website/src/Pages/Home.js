import React from "react";
import BackgroundImage from "../Assets/img/banner/s_slider_bg.jpg";
import BackgroundImage2 from "../Assets/img/bg/ucm_bg02.jpg";
import PosterImage from "../Assets/img/poster/s_ucm_poster01.jpg";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<main>
			{/* up-coming-movie-area */}
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
							{[...Array(8)].map((item, index) => {
								return (
									<div className="col-lg-3">
										<div className="movie-item movie-item-two mb-30" key={index}>
											<div className="movie-poster">
												<Link to="/movie/detail/1" className="d-block">
													<img src={PosterImage} className="w-100 h-100" alt="" />
												</Link>
											</div>
											<div className="movie-content">
												<div className="rating">
													<i className="fas fa-star" />
													<i className="fas fa-star" />
													<i className="fas fa-star" />
													<i className="fas fa-star" />
													<i className="fas fa-star" />
												</div>
												<h5 className="title">
													<Link to="/movie/detail/1">Message in a Bottle</Link>
												</h5>
												<span className="rel">Adventure</span>
												<div className="movie-content-bottom">
													<ul>
														<li className="tag">
															<a href="#">HD</a>
															<a href="#">English</a>
														</li>
														<li>
															<span className="like">
																<i className="fas fa-thumbs-up" /> 3.5
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
					</div>
				</div>
			</section>
		</main>
	);
};

export default Home;
