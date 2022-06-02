export const authMiddleware = (req, res, next) => {
	if (!req.session.auth) {
		console.log("non connecte");
		return res.render("errorpage", {});
	}
	console.log("connecté");

	next();
};
