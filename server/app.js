const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const ip = require("ip");
const cors = require("cors");
dotenv.config({ path: "./.env" });
const mongoose = require("mongoose");
const MoviesData = require("./src/Seeder/movies.json");
const castData = require("./src/Seeder/cast.json");

const Movies = require("./src/models/Movies");

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		autoIndex: true,
	})
	.then(() => console.log("DB connection successful!"))
	.catch((err) => console.log(err));

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use("/auth", require("./src/Routes/auth"));
app.use("/movies", require("./src/Routes/movies"));


const seedMovies = async () => {
	const movies = await Movies.find({});
	if (movies.length) return;
	for (const movie of MoviesData) {
		if (movie.id) {
			const cast = castData[movie.id];
			movie.cast = cast;
		}
		const newMovie = new Movies(movie);
		newMovie.save();
	}
};

seedMovies();

const PORT = process.env.PORT || 9000;

// 404 handler
app.use(function (req, res) {
	if (req.accepts("json")) {
		return res.status(404).send({ message: "Not Found" });
	}
});

app.listen(PORT, () => {
	console.log(`Server running on ${ip.address()}:${PORT}`);
});
