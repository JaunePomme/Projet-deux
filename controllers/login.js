import UserModel from "../Models/User.js";
import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config();
const { APP_SECRET_KEY: secret } = process.env;
export default async function login(req, res) {
	if (req.method === "GET") {
		res.render("home", { errorMessages: [] });
	} else {
		const { firstName, lastName, email, password, password_confirm } = req.body;
		const errorMessages = [];

		if (!firstName || firstName.trim() === "")
			errorMessages.push('Le champs "firstname" doit être renseigné!');
		if (!lastName || lastName.trim() === "")
			errorMessages.push('Le champs "lastname" doit être renseigné!');
		if (!email || email.trim() === "")
			errorMessages.push('Le champs "email" doit être renseigné!');
		if (!password || password.trim() === "")
			errorMessages.push('Le champs "password" doit être renseigné!');
		if (!password_confirm || password_confirm.trim() === "")
			errorMessages.push('Le champs "password_confirm" doit être renseigné!');

		if (req.body.password !== req.body.password_confirm) {
			errorMessages.push("les passwords ne correspondent pas");
		}

		if (errorMessages.length > 0) {
			errorMessages.forEach((m) => console.log(m));
			return res.render("home", { errorMessages });
		}

		const user = await UserModel.findOne({ email: req.body.email });
		if (user) {
			errorMessages.push("utilisateur existe déjà");
			return res.render("home", { errorMessages });
		} else {
			const sha256Hasher = crypto.createHmac("sha256", secret);
			const sha256Hasher_confirm = crypto.createHmac("sha256", secret);
			const passwordHashed = sha256Hasher
				.update(req.body.password)
				.digest("hex");
			const confirm_passwordHashed = sha256Hasher_confirm
				.update(req.body.password)
				.digest("hex");
			console.log("utilisateur créé");

			const newUser = await UserModel.create({
				firstName,
				lastName,
				email,
				password: passwordHashed,
				confirm_password: confirm_passwordHashed,
			});
			newUser.save();
			res.render("login", { errorMessages: [] });
		}
	}
}
