import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
	imageId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	quantity: {
		type: Number,
		required: true,
		default: 1
	}
});

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	cartData: {
		type: Map,
		of: cartItemSchema,
		default: {}
	}
}, { minimized: false });

const userModal = mongoose.models.user || mongoose.model("user", userSchema);
export default userModal;
