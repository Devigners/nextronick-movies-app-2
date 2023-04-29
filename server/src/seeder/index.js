const Movies = require("../models/Movies");
const moviesDataSet = require("./movies.json");
const castDataSet = require("./cast.json");

module.exports = {
	// seed movies data to database
	seedMovies: async () => {
		const movies = await Movies.find({});
		if (movies.length) return;
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
	},
};
