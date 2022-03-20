const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = Schema(
	{
		keyword: { type: Schema.Types.ObjectId, ref: "Keyword" },
		title: String,
		page_url: String,
		image_url: String,
		date: String,
		place: String,
		city: String,
		content: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
