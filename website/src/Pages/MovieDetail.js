import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import BackgroundImage from "../Assets/img/bg/episode_bg.jpg";
import BackgroundImage2 from "../Assets/img/bg/movie_details_bg.jpg";
import PlayIcon from "../Assets/img/images/play_icon.png";
import axiosInstance from "../Config/axios";

const MovieDetail = () => {
	const [movie, setMovie] = useState(null);
	const [loading, setLoading] = useState(true);
	const { id } = useParams();
	const [reviewText, setReviewText] = useState("");
	const [reviewRating, setReviewRating] = useState(0);
	const [showReview, setShowReview] = useState(false);
	const [reviewId, setReviewId] = useState("");
	const [userReviewRating, setUserReviewRating] = useState(0);
	const navigate = useNavigate();
	const { isAuth, user } = useSelector((s) => s.auth);
	const reviewFieldRef = React.useRef();

	const getMovie = async () => {
		try {
			const res = await axiosInstance.get("/movies/" + id);
			setLoading(false);
			setMovie(res.data.data);
		} catch (error) {}
	};

	useEffect(() => {
		getMovie();
	}, []);

	useEffect(() => {
		if (movie) {
			if (movie.comments.length !== 0) {
				const movieReviewRating = movie.comments.reduce((acc, comment) => acc + comment.rating, 0) / 5;
				setUserReviewRating(Math.round(movieReviewRating));
			}
		}
	}, [movie]);

	if (loading) {
		return (
			<section
				style={{
					backgroundImage: `url(${BackgroundImage2})`,
				}}
				className="breadcrumb-area breadcrumb-bg text-center text-white"
			>
				<h4>Loading...</h4>
			</section>
		);
	}

	const handleSubmitReview = async (e) => {
		e.preventDefault();
		try {
			if (!reviewText || !reviewRating) {
				alert("Please fill all the fields");
				return;
			} else {
				if (reviewId) {
					const res = await axiosInstance.put(`movies/${id}/comments/${reviewId}`, {
						text: reviewText,
						rating: reviewRating,
					});

					if (res.status === 200) {
						toast.success("Review Updated Successfully");
						setMovie(res.data.data);
						setShowReview(false);
					}
				} else {
					const res = await axiosInstance.post(`movies/${id}/comments`, {
						text: reviewText,
						rating: reviewRating,
						userId: user._id,
					});
					if (res.status === 200) {
						toast.success("Review Added Successfully");
						setMovie(res.data.data);
						setShowReview(false);
					}
				}
			}
		} catch (error) {}
	};

	const handleEditReview = (review) => {
		setReviewText(review.text);
		setReviewRating(review.rating);
		setReviewId(review._id);
		setShowReview(true);
		reviewFieldRef?.current.scrollIntoView({ behavior: "smooth" });
	};

	if (!movie) {
		return null;
	}

	return (
		<div>
			<section
				className="movie-details-area"
				data-background="img/bg/movie_details_bg.jpg"
				style={{ backgroundImage: `url(${BackgroundImage2})` }}
			>
				<div className="container">
					<div className="row position-relative">
						<div className="col-xl-3 col-lg-4">
							<div className="movie-details-img">
								<img
									src={movie.poster_path}
									alt=""
									style={{
										width: "100%",
										height: "430px",
										objectFit: "cover",
										borderRadius: "10px",
										objectPosition: "center",
									}}
								/>
								<a href="https://www.youtube.com/watch?v=R2gbPxeNk2E" className="popup-video">
									<img src={PlayIcon} alt="" />
								</a>
							</div>
						</div>
						<div className="col-xl-9 col-lg-8">
							<div className="movie-details-content">
								<div>
									<i className="fas fa-star text-primary" /> {userReviewRating} / 5
								</div>
								<h2>{movie.title}</h2>
								<div className="banner-meta">
									<ul>
										<li className="category">
											{movie.genres &&
												movie.genres.map((item, index) => {
													return (
														<a href="#" key={index}>
															{item}
															{index < movie.genres.length - 1 ? ", " : ""}
														</a>
													);
												})}
										</li>
										<li className="release-time">
											<span>
												<i className="far fa-calendar-alt" /> {moment(movie.release_date).format("YYYY")}
											</span>
										</li>
									</ul>
								</div>
								<p>{movie.description}</p>
								<div className="movie-details-prime mt-4">
									<button
										onClick={() => {
											if (!isAuth) {
												return navigate("/login", { state: { from: `/movie/detail/${id}` } });
											}
											setShowReview(!showReview);
											setReviewId("");
											reviewFieldRef?.current.scrollIntoView({ behavior: "smooth" });
										}}
										className="btn btn-primary"
									>
										Write Review
									</button>
									<a href={movie.trailer} target="_blank" className="btn popup-video ml-3">
										<i className="fas fa-play" /> Watch Trailer
									</a>
								</div>
								<div className="mb-5" ref={reviewFieldRef}>
									{showReview && (
										<div className="review-form mt-4 p-4 border bg-gray rounded-lg">
											<div className="widget-title mb-4">
												<h5 className="title">Write Review</h5>
											</div>
											<form onSubmit={handleSubmitReview}>
												<div className="form-group">
													<label htmlFor="name" className="d-block">
														Your Rating
													</label>
													<StarRatings
														rating={reviewRating}
														starRatedColor="#e4d804"
														changeRating={(newRating) => setReviewRating(newRating)}
														numberOfStars={5}
														starSpacing="3px"
														starHoverColor="#e4d804"
														name="rating"
														starDimension="30px"
													/>
												</div>
												<div className="form-group mb-4">
													<label>Your Review</label>
													<textarea
														className="form-control bg-transparent text-white"
														placeholder="Type here"
														value={reviewText}
														onChange={(e) => setReviewText(e.target.value)}
													>
														{reviewText}
													</textarea>
												</div>
												<div className="d-flex">
													<button
														onClick={() => {
															setShowReview(false);
															setReviewId("");
															setReviewText("");
															setReviewRating(0);
														}}
														className="btn"
													>
														Cancel
													</button>
													<button type="submit" className="btn ml-3">
														Submit
													</button>
												</div>
											</form>
										</div>
									)}
								</div>
								<div className="blog-comment mb-40">
									<div className="widget-title mb-45">
										<h5 className="title mb-4">Cast's</h5>
										<div className="row">
											{movie.cast?.map((item, index) => {
												return (
													<div className="col-lg-4 mb-3" key={index}>
														<div className="d-flex align-items-center">
															<div className="initials mr-3">
																{item.name.split(" ").map((item) => {
																	return item[0];
																})}
															</div>
															<h6>{`${item.name}`}</h6>
														</div>
													</div>
												);
											})}
										</div>
									</div>
								</div>
								<div className="blog-comment mb-80">
									<div className="widget-title mb-45">
										<h5 className="title">Reviews's ({movie?.comments?.length})</h5>
									</div>
									<ul>
										{movie?.comments.map((item, index) => {
											return (
												<li key={index}>
													<div className="single-comment w-100">
														<div className="comment-text w-100">
															<div className="comment-avatar-info">
																<h5>
																	{`${item.userId?.first_name} ${item.userId?.last_name}`}{" "}
																	<span className="comment-date">{moment(item.createdAt).fromNow()}</span>{" "}
																</h5>
																{user?._id === item?.userId?._id && (
																	<a
																		className="comment-reply-link"
																		style={{ cursor: "pointer" }}
																		onClick={() => handleEditReview(item)}
																	>
																		Edit <i className="fas fa-edit"></i>
																	</a>
																)}
															</div>
															<p className="w-100">{item.text}</p>
														</div>
													</div>
												</li>
											);
										})}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="episode-area episode-bg" style={{ backgroundImage: `url(${BackgroundImage})` }}></section>
		</div>
	);
};

export default MovieDetail;
