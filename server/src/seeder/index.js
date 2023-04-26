const Movies = require("../models/Movies");
const moviesDataSet = require("./movies.json");
const Cast = require("../models/Cast");
const castDataSet = require("./cast.json");

const seedMovies = async () => {
	await Movies.deleteMany({});
	for (const movie of moviesDataSet) {
		// Get movie cast
		if (movie.id) {
			const cast = castDataSet[movie.id];
			movie.cast = cast;
		}

		// get poster image
		if (movie.poster_path) {
			movie.poster_path = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
		}

		const newMovie = new Movies({
			...movie,
		});

		newMovie.save();
	}
};

const addCastToMovies = async () => {
	try {
		await Cast.deleteMany({});
		await Cast.insertMany(castDataSet);
		return "Genres data seeded successfully";
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	seedMovies,
	addCastToMovies,
};
