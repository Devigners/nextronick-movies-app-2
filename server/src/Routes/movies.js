const express = require("express");
const Movies = require("../models/Movies");
const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const limit = parseInt(req.query.limit) || 8;
		const page = parseInt(req.query.page) || 1;
		const search = req.query.search || "";
		const genre = req.query.genre || "";
		const ratingOrder = req.query.ratingOrder || "desc";

		const movies = await Movies.find(
			{ title: { $regex: search, $options: "i" }, genres: { $regex: genre, $options: "i" } },
			{ _id: 1, title: 1, poster_path: 1, release_date: 1, genres: 1, rating: 1, trailer: 1 }
		).sort({ vote_average: ratingOrder });

		const moviesPagination = movies.slice((page - 1) * limit, page * limit);

		return res.status(200).json({
			message: "Movies fetched successfully",
			data: moviesPagination,
			total: movies.length,
			limit,
			page,
		});
	} catch (err) {
		return res.status(500).json({
			message: "Something went wrong",
			error: err.message,
		});
	}
});

router.get("/:id", async (req, res) => {
	try {
		const movie = await Movies.findOne({ _id: req.params.id }).populate("comments.userId", "first_name last_name");
		movie.comments.sort((a, b) => b.createdAt - a.createdAt);
		return res.status(200).json({
			message: "Movie fetched successfully",
			data: movie,
		});
	} catch (err) {
		return res.status(500).json({
			message: "Something went wrong",
			error: err.message,
		});
	}
});

router.post("/:id/comments", async (req, res) => {
	try {
		if (!req.body.text || !req.body.userId || !req.body.rating) {
			return res.status(400).json({
				message: "Please enter all fields",
			});
		}

		const movie = await Movies.findOne({ _id: req.params.id });

		const userCommented = movie.comments.find((comment) => comment.userId.toString() === req.body.userId);
		if (userCommented) {
			return res.status(400).json({
				message: "You already commented on this movie",
				data: movie,
			});
		}
		movie.comments.push({
			userId: req.body.userId,
			rating: req.body.rating,
			text: req.body.text,
			createdAt: Date.now(),
		});
		await movie.save();
		const movies = await Movies.findOne({ _id: req.params.id }).populate("comments.userId", "first_name last_name");
		movies.comments.sort((a, b) => b.createdAt - a.createdAt);
		return res.status(200).json({
			message: "Comment added successfully",
			data: movies,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Something went wrong",
			error: error.message,
		});
	}
});

router.put("/:id/comments/:commentId", async (req, res) => {
	try {
		const movie = await Movies.findOne({ _id: req.params.id });
		const comment = movie.comments.find((comment) => comment._id.toString() === req.params.commentId);
		comment.text = req.body.text;
		comment.rating = req.body.rating;
		await movie.save();
		const movies = await Movies.findOne({ _id: req.params.id }).populate("comments.userId", "first_name last_name");
		movies.comments.sort((a, b) => b.createdAt - a.createdAt);
		return res.status(200).json({
			message: "Comment updated successfully",
			data: movies,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Something went wrong",
			error: error.message,
		});
	}
});

module.exports = router;
