export const authMiddleware = (req, res, next) => {
	if (!req.session.auth) {
		console.log("non connecte");
		return res.send("NON CONNECTE");
	}
	console.log("connecté");

	next();
};
