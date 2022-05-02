const express = require("express");
const axios = require("axios");
const router = express.Router();

const User = require("../models/User");
const Event = require("../models/Event");
const Keyword = require("../models/Keyword");

router.get("/events", async (req, res) => {
	const USER_ID = "62377afa8fa59b08a68aa786";
	const user = await User.findById(USER_ID).populate("events");

	const events = []
	events.push(...user.events);
	let message = "Events found for the user.";
	if(user.events.length === 0) {
		message = "No events found for the user.";
	}
	return res.json({ status: 200, message: message, data: events });
});

router.get("/event/:id", async (req, res) => {
	const event = await Event.findById(req.params.id);

	return res.json({ status: 200, message: "Event found.", data: event });
});

router.delete("/events", async (req, res) => {

	const deletingResult = await Event.deleteMany()	

	if(deletingResult['acknowledged'] == true) {
		
		let message = ""
		if(deletingResult['deletedCount'] == 0) {
			message = "There is no event to delete"
		} else {
			message = `${deletingResult['deletedCount']} events deleted successfully`
			await Keyword.deleteMany();
		}
		
		return res.json({ status: 200, message: message});
	}
	return res.json({ status: 404, message: 'Event could not delete please try again later.' });
});

router.delete("/event", async (req, res) => {
	const id = req.query.id;

	const event = await Event.findById(id).populate("keyword");
	
	const deletingResult = await Event.deleteOne({ _id: id })

	if(deletingResult['acknowledged'] == true) {
		
		if(event.keyword.length == 1) {
			await Keyword.deleteOne({ _id: event.keyword._id })
		} else {
			const newvalues = { $set: {length: event.keyword.length - 1 } };
			await Keyword.updateOne({_id: event.keyword._id}, newvalues, {upsert: true});
		}

		let message = ""
		if(deletingResult['deletedCount'] == 0) {
			message = "There is no event to delete"
		} else {
			message = `The event deleted successfully`
		}
		
		return res.json({ status: 200, message: message});
	}
	return res.json({ status: 404, message: 'Event could not delete please try again later.' });
});

router.get("/event-search", async (req, res) => {
	const USER_ID = "62377afa8fa59b08a68aa786";
	const keyword = req.query.keyword;
	
	const searchedKeywordIsExist = await Keyword.findOne({ name: keyword });

	if (searchedKeywordIsExist !== null) {
		const user = await User.findById(USER_ID).populate("events", null, { keyword: searchedKeywordIsExist._id });

		if (user.events.length > 0) {
			return res.json({ status: 200, message: `Events found for the keyword ${keyword}.`, data: user.events });
		}

		const events = await Event.find({ keyword: searchedKeywordIsExist._id });

		events.map((event) => user.events.push(event));
		await user.save();

		return res.json({ status: 200, message: `Events found for the keyword ${keyword}.`, data: events });

	} else {
		
		const events = await axios.get(encodeURI(`${process.env.SCRAPING_API_URL}scrap/${keyword}`));
		

		if (events.data.length === 0) {
			return res.json({ status: 404, message: `No event was found for the keyword ${keyword}.`, data: [] });
		}

		const user = await User.findById(USER_ID);
		const newKeyword = new Keyword({ name: keyword, length: events.data.length });
		try {
			await newKeyword.save();
		} catch (err) {
			return res.status(500).send(err);
		}

		for (event of events.data) {
			event.keyword = newKeyword._id;
			var newEvent = new Event(event);
			await newEvent.save();
			user.events.push(newEvent);
		}

		await user.save();

		return res.json({
			status: 200,
			message: `New events have been created for the keyword ${keyword}.`,
			data: events.data,
		});
	}
});

module.exports = router;
