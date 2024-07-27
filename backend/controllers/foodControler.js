import foodModal from "../models/foodModal.js";
import fs from "fs";


// add food item

const addFood = async (req, res) => {



	let image_filename = `${req.file.filename}`

	const food = new foodModal({
		name: req.body.name,
		description: req.body.description,
		price: req.body.price,
		image: image_filename,
		category: req.body.category
	})
	try {
		await food.save();
		res.json({
			success: true,
			message: "Food added successfully"
		});
	} catch (err) {
		console.log(err);
		res.json({
			success: false,
			message: `${err}`
		});
	}
}

// all food list

const listFood = async (req, res) => {

	try {
		const foods = await foodModal.find();
		res.json({
			success: true,
			data: foods
		})
	} catch (err) {
		console.log(err);
		res.json({
			success: false,
			message: `${err}`
		})
	}
}

// remove food item
const removeFood = async (req, res) => {
	try {
		const { ids } = req.body;

		for (let id of ids) {
			const foodDelete = await foodModal.findById(id);
			if (foodDelete) {

				fs.unlink(`uploads/${foodDelete.image}`, (err) => {
					if (err) {
						console.log(err);
					}
				});

				await foodModal.findByIdAndDelete(id);
			}
		}

		res.json({
			success: true,
			message: "Foods deleted successfully"
		});

	} catch (err) {
		console.log(err);
		res.json({
			success: false,
			message: `${err}`
		});
	}
};

export { addFood, listFood, removeFood }