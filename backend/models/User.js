const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
	name: String,
	surname: String,
	email: String,
	password: String,
	events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
});

module.exports = mongoose.model("User", UserSchema);
