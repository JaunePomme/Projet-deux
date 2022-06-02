import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import route from "./routes/routes.js";
import session from "express-session";
import flash from "connect-flash";
import MongoStore from "connect-mongo";
import bodyParser from "body-parser";
// ==========
// App initialization
// ==========

dotenv.config();
const { APP_HOSTNAME: hostname, APP_PORT: port, NODE_ENV } = process.env;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
// Connexion à la base de données
mongoose
	.connect("mongodb://127.0.0.1:27017/furniture", {
		useNewUrlParser: true,
		useUnifiedTopology: true, // options qui évitent des warnings inutiles
	})
	.then(init); // Toutes les méthodes de mongoose renvoient des promesses
app.set("view engine", "pug");
app.locals.pretty = NODE_ENV !== "production"; // Indente correctement le HTML envoyé au client (utile en dev, mais inutile en production)

// ==========
// App middlewares
// ==========

// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ==========
// App routers
// ==========
app.use(
	session({
		name: "simple",
		secret: "simple",
		resave: true,
		saveUninitialized: true,
		store: MongoStore.create({
			mongoUrl: "mongodb://127.0.0.1:27017/sessions",
		}),
	})
);
app.use(flash());

app.use((req, res, next) => {
	res.locals.flash_message = req.flash("success_message");
	res.locals.messages = [];
	next();
});
app.use("/", route);

// ==========
// App start
// ==========

async function init() {
	console.log("connecté à la db");
	// //mongosh, shows dbs, use kittens, show collections, db.cats.find(), db.cats.drop()
	app.listen(port, () => {
		console.log(`App listening at http://${hostname}:${port}`);
	});
}
