import orderModal from "../models/orderModal.js";
import userModal from "../models/userModal.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order from frontend

const placeOrder = async (req, res) => {

	const frontend_url = "http://localhost:5173"

	try {

		const newOrder = new orderModal({
			userId: req.body.userId,
			items: req.body.items,
			amount: req.body.amount,
			address: req.body.address
		})

		await newOrder.save();

		await userModal.findByIdAndUpdate(req.body.userId, {
			cartData: {}
		});

		const line_items = req.body.items.map((item) => {
			return {
				price_data: {
					currency: "inr",
					product_data: {
						name: item.name
					},
					unit_amount: item.price * 100 * 80
				},
				quantity: item.quantity
			};
		});

		line_items.push({
			price_data: {
				currency: "inr",
				product_data: {
					name: "Delivery Charge"
				},
				unit_amount: 2 * 100 * 80
			},
			quantity: 1
		});

		const session = await stripe.checkout.sessions.create({

			line_items: line_items,
			mode: "payment",
			success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
			cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
			payment_method_types: ["card"]
		});

		res.json({ success: true, session_url: session.url });
	} catch (err) {
		console.log(err);
		res.json({ success: false, message: err });
	}



}



export { placeOrder }