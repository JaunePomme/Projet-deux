import FurnitureModel from "../Models/Furniture.js";

export default async function connect(req, res) {
	let count = 0;
	const data = (await FurnitureModel.find()).forEach(() => count++);
	let countBois = 0;
	const boiscounter = (await FurnitureModel.find({ material: "bois" })).forEach(
		() => countBois++
	);
	(countBois / count) * 100;
	let countNoyer = 0;
	const inoyercounter = (
		await FurnitureModel.find({ material: "noyer" })
	).forEach(() => countNoyer++);
	(countNoyer / count) * 100;
	let countFrene = 0;
	const frenecounter = (
		await FurnitureModel.find({ material: "frêne" })
	).forEach(() => countFrene++);
	(countFrene / count) * 100;
	let countAcier = 0;
	const aciercounter = (
		await FurnitureModel.find({ material: "acier" })
	).forEach(() => countAcier++);
	(countAcier / count) * 100;
	let countInox = 0;
	const inoxcounter = (await FurnitureModel.find({ material: "inox" })).forEach(
		() => countInox++
	);
	(countInox / count) * 100;
	let countAluminium = 0;
	const aluminiumcounter = (
		await FurnitureModel.find({ material: "aluminium" })
	).forEach(() => countAluminium++);
	(countAluminium / count) * 100;
	let countPlastique = 0;
	const plastiquecounter = (
		await FurnitureModel.find({ material: "plastique" })
	).forEach(() => countPlastique++);
	(countPlastique / count) * 100;
	const countList = [
		countBois,
		countFrene,
		countNoyer,
		countAcier,
		countAluminium,
		countInox,
		countPlastique,
	];
	res.render("chart", {
		countList,
	});
}
