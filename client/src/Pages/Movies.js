import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useSearchParams } from "react-router-dom";
import BackgroundImage2 from "../Assets/img/bg/breadcrumb_bg.jpg";
import axiosInstance from "../Config/axios";

const Movies = () => {
	const [movies, setMovies] = useState([]);
	const [page, setPage] = useState(1);
	const [genre, setGenre] = useState("");
	const [totalMovies, setTotalMovies] = useState(0);

	const [searchParams] = useSearchParams();
	const searchQuery = searchParams.get("search");

	const GenreLists = [
		"All",
		"Animation",
		"Adventure",
		"Family",
		"Fantasy",
		"Comedy",
		"Action",
		"Science Fiction",
		"Thriller",
		"Crime",
		"Horror",
		"Mystery",
		"Romance",
		"Drama",
		"History",
		"War",
		"Music",
	];

	const onChangeGenre = (e) => {
		setGenre(e.target.value);
		setPage(1);
	};

	const getMovies = async () => {
		try {
			const res = await axiosInstance.get("/movies", {
				params: {
					page,
					limit: 8,
					genre,
					search: searchQuery || "",
				},
			});
			setMovies(res.data.data);
			setTotalMovies(res.data.total);
		} catch (error) {}
	};

	useEffect(() => {
		getMovies();
	}, [page, genre, searchParams]);

	const handlePageClick = (e) => {
		const selectedPage = e.selected;
		setPage(selectedPage + 1);
	};

	return (
		<div>
			<section
				className="breadcrumb-area breadcrumb-bg"
				data-background="img/bg/breadcrumb_bg.jpg"
				style={{
					backgroundImage: `url(${BackgroundImage2})`,
				}}
			>
				<div className="container">
					<div className="row mb-5">
						<div className="col-12">
							<div className="breadcrumb-content">
								<h2 className="title">
									Our <span>Movies</span>
								</h2>
								<nav aria-label="breadcrumb">
									<ol className="breadcrumb">
										<li className="breadcrumb-item">
											<a href="index.html">Home</a>
										</li>
										<li className="breadcrumb-item active" aria-current="page">
											Movie
										</li>
									</ol>
								</nav>
							</div>
						</div>
					</div>
					<div
						className="ucm-active-two "
						style={{
							position: "relative",
							zIndex: 1,
						}}
					>
						<div className="movie-page-meta mb-5">
							<form action="#" className="movie-filter-form">
								<select className="custom-select" onChange={onChangeGenre}>
									<option selected="">Genre</option>
									{GenreLists.map((item, index) => {
										return (
											<option key={index} value={item} onClick={() => setGenre(item)}>
												{item}
											</option>
										);
									})}
								</select>
							</form>
						</div>
						<div className="row">
							{movies.map((item, index) => {
								return (
									<div className="col-xl-3 col-lg-4 col-sm-6 grid-item grid-sizer cat-two" key={index}>
										<div className="movie-item movie-item-three mb-50">
											<div className="movie-poster">
												<img src={item.poster_path} alt="" />
												<ul className="overlay-btn">
													<li>
														<a href={item.trailer} target="_blank" className="popup-video btn">
															Watch Now
														</a>
													</li>
													<li>
														<Link to={`/movie/detail/${item._id}`} className="btn">
															Details
														</Link>
													</li>
												</ul>
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
						<div className="row">
							<div className="col-12">
								<div className="pagination-wrap mt-30">
									<nav>
										<ReactPaginate
											breakLabel="..."
											nextLabel="Next"
											onPageChange={handlePageClick}
											pageRangeDisplayed={5}
											initialPage={0}
											pageCount={totalMovies / 8}
											activeClassName="active"
											previousLabel="Prev"
											renderOnZeroPageCount={null}
										/>
									</nav>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Movies;
