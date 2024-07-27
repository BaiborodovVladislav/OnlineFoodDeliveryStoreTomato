
import { useState } from "react";
import { assets } from "../../assets/admin_assets/assets";
import "./Add.css";
import axios from "axios";
import { toast } from "react-toastify";
const Add = ({ url }) => {


	const [image, setImage] = useState(null);

	const [data, setData] = useState({
		name: "",
		description: "",
		category: "Salad",
		price: "",
	});

	const onChangeHandler = (event) => {
		const name = event.target.name
		const value = event.target.value
		setData(data => ({ ...data, [name]: value }))
	};

	const onSubmitHandler = async (event) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("description", data.description);
		formData.append("category", data.category);
		formData.append("price", Number(data.price));
		formData.append("image", image);

		try {
			const response = await axios.post(`${url}/api/food/add`, formData);

			if (response.data) {
				const { success, error } = response.data;
				if (success) {
					setData({
						name: "",
						description: "",
						category: "Salad",
						price: "",
					});
					setImage(null);
					toast.success(success.message || "Product successfully added.");
				} else if (error) {
					toast.error(error.message || "Unknown error occurred.");
				} else {
					toast.error("Unknown response format.");
				}
			} else {
				toast.error("No response data received.");
			}
		} catch (err) {
			toast.error("An error occurred while adding the product.");
			console.error(err);
		}
	};

	return (
		<div className="add">
			<form className="flex-col" onSubmit={onSubmitHandler}>
				<div className="add-img-upload flex-col">
					<p>Upload Image</p>
					<label htmlFor="Image">
						<img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
					</label>
					<input onChange={(e) => setImage(e.target.files[0])} type="file" id="Image" hidden required />
				</div>
				<div className="add-product-name flex-col">
					<p>Product Name</p>
					<input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type Here" />
				</div>
				<div className="add-product-description flex-col">
					<p>Product Description</p>
					<textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder="Write content here" />
				</div>
				<div className="add-categry-price">
					<div className="add-categry flex-col">
						<p>Product Category</p>
						<select onChange={onChangeHandler} value={data.category} name="category" >
							<option value="Salad">Salad</option>
							<option value="Rolls">Rolls</option>
							<option value="Desert">Desert</option>
							<option value="Sandwitch">Sandwitch</option>
							<option value="Cake">Cake</option>
							<option value="Pure Veg">Pure Veg</option>
							<option value="Pasta">Pasta</option>
							<option value="Noodles">Noodles</option>
						</select>
					</div>
					<div className="add-price flex-col">
						<p>Product Price</p>
						<input onChange={onChangeHandler} value={data.price} type="Number" name="price" placeholder="$20" />
					</div>
				</div>
				<button type="submit" className="add-btn">ADD</button>
			</form>
		</div>
	);
};

export default Add;
