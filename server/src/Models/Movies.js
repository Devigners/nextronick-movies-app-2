const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
	genres: { type: [String], required: true },
	id: { type: Number, required: true, unique: true },
	description: { type: String, required: true },
	poster_path: { type: String, required: true },
	release_date: { type: Date, required: true },
	title: { type: String, required: true },
	trailer: { type: String, required: true },
	rating: { type: Number, required: true },
	cast: [
		{
			name: { type: String, required: true },
		},
	],
	comments: [
		{
			userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
			rating: { type: Number, required: true },
			text: { type: String, required: true },
			createdAt: { type: Date, required: true, default: Date.now },
		},
	],
});

const Movies = model("Movie", movieSchema);

module.exports = Movies;
