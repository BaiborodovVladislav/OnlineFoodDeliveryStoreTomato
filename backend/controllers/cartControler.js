import userModal from "../models/userModal.js";

// add items to user cart 

const addToCart = async (req, res) => {
	try {
		const userData = await userModal.findById(req.body.userId);

		if (!userData) {
			return res.json({ success: false, message: "User not found" });
		}

		let cartData = await userData.cartData || new Map();

		if (!cartData.has(req.body.itemId)) {
			cartData.set(req.body.itemId, { imageId: req.body.itemId, quantity: 1 });
		} else {
			let item = cartData.get(req.body.itemId);
			item.quantity += 1;
			cartData.set(req.body.itemId, item);
		}

		userData.cartData = cartData;
		await userData.save();

		res.json({ success: true, message: "Item added to cart" });
	} catch (err) {
		console.log(err);
		res.json({ success: false, message: "Error" });
	}
};


// remove items from user cart


const removeFromCart = async (req, res) => {
	try {
		const userData = await userModal.findById(req.body.userId);

		if (!userData) {
			return res.json({ success: false, message: "User not found" });
		}

		let cartData = userData.cartData || new Map();

		if (cartData.has(req.body.itemId)) {
			let item = cartData.get(req.body.itemId);
			if (item.quantity > 1) {
				item.quantity -= 1;
				cartData.set(req.body.itemId, item);
			} else {
				cartData.delete(req.body.itemId);
			}
		}

		userData.cartData = cartData;
		await userData.save();

		res.json({ success: true, message: "Item removed from cart" });
	} catch (err) {
		console.log(err);
		res.json({ success: false, message: "Error" });
	}
};

// fetch user cart data 

const getCartItems = async (req, res) => {
	try {
		const userData = await userModal.findById(req.body.userId);
		let cartData = userData.cartData || new Map();

		if (!userData) {
			return res.json({ success: false, message: "User not found" });
		}

		res.json({ success: true, cartData: Array.from(userData.cartData.entries()) });
	} catch (err) {
		console.log(err);
		res.json({ success: false, message: "Error" });
	}
}


export { addToCart, removeFromCart, getCartItems }