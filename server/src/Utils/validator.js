const validator = async (schema, reqData, res, next) => {
	try {
		await schema.validate(reqData, { abortEarly: false });
		next();
	} catch (e) {
		return res.status(400).json({
			message: "Invalid request data",
		});
	}
};

module.exports = validator;
