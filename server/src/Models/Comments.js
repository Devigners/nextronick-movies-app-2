const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
	text: { type: String, required: true },
	createdAt: { type: Date, required: true, default: Date.now },
	userId: { type: Schema.Types.ObjectId, required: true },
	movieId: { type: Schema.Types.ObjectId, required: true },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
