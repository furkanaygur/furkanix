const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KeywordSchema = Schema(
	{
		name: String,
		// events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Keyword", KeywordSchema);
