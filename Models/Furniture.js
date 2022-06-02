import mongoose from "mongoose";
const FurnitureSchema = new mongoose.Schema({
	furniture: { type: String, required: true },
	category: { type: String, required: true },
	material: { type: Array, required: true },
	company: { type: Array, required: true },
});
const FurnitureModel = mongoose.model(
	"furniture",
	FurnitureSchema,
	"furniture"
);
export default FurnitureModel;
