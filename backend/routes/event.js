const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Data = require("../dumpData.json");

router.get("/event", async (req, res) => {
	const USER_ID = "62377afa8fa59b08a68aa786";
	const user = await User.findById(USER_ID);
	const events = []
	events.push(...user.events);
	let message = "Events found for the user.";
	if(user.events.length === 0) {
		message = "No events found for the user. Showing dumy data";
		events.push(...Data)
	}
	return res.json({ status: 200, message: message, data: events });
});

module.exports = router;
