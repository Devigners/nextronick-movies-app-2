const yup = require("yup");

yup.setLocale({
	mixed: {
		required: "This field is required",
	},
	string: {
		email: "This field must be a valid email",
	},
});

module.exports = yup;
