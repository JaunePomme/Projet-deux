import FurnitureModel from "../Models/Furniture.js";
export default async function connect(req, res) {
	const product = await FurnitureModel.findOne({
		furniture: req.body.furniture,
	});
	const { furniture, category, material, company } = product;
	res.render("product", { furniture, category, material, company });
}
