const mongoose = require("mongoose");

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		autoIndex: true,
	})
	.then(() => console.log("DB connection successful!"))
	.catch((err) => console.log(err));
