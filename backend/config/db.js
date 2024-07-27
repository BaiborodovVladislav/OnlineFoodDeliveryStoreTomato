import mongoose from "mongoose";

export const connectDB = async () => {
	await mongoose.connect("mongodb+srv://gimbogimbo333:Zaebalo123321@tomatoproject.twskqas.mongodb.net/TomatoProject").then(() => {
		console.log("MongoDB connected");
	})
}