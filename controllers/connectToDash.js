import UserModel from "../Models/User.js";
import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config();
const { APP_SECRET_KEY: secret } = process.env;
export default async function dashboard(req, res) {
	const { email, password } = req.body;
	const errorMessages = [];

	if (!email || email.trim() === "")
		errorMessages.push('Le champs "email" doit être renseigné!');
	if (!password || password.trim() === "")
		errorMessages.push('Le champs "password" doit être renseigné!');

	if (errorMessages.length > 0) {
		errorMessages.forEach((m) => console.log(m));
		return res.render("login", { errorMessages });
	}

	//vérif dans DB
	const sha256Hasher = crypto.createHmac("sha256", secret);
	const passwordHashed = sha256Hasher.update(req.body.password).digest("hex");
	const user = await UserModel.findOne({
		email: req.body.email,
		password: passwordHashed,
	});
	if (user) {
		req.flash("flash_message", "Je suis connecté");
		req.session.auth = true;
		res.redirect("/");
	} else {
		errorMessages.push("Mauvais utilisateur");
		return res.render("login", { errorMessages });
	}
}
