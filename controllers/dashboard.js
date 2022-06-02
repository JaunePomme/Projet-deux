import FurnitureModel from "../Models/Furniture.js";
export default async function connect(req, res) {
	const categories = ["étagère", "armoire"];
	const materials = [
		"bois",
		"noyer",
		"acier",
		"frêne",
		"plastique",
		"inox",
		"aluminium",
	];
	const companies = ["Bbois", "Pplastique", "Métalo"];
	res.render("dashboard", { materials, companies, categories });
}
