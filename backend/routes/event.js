const express = require("express");
const axios = require("axios");
const router = express.Router();

const User = require("../models/User");
const Event = require("../models/Event");
const Keyword = require("../models/Keyword");

router.get("/events", async (req, res) => {
	const USER_ID = "62377afa8fa59b08a68aa786";

	const user = await User.findById(USER_ID).populate("events");
	const favorites = await User.findById(USER_ID).populate("favorites");
	
	let message = "Events found for the user.";
	if(user.events.length === 0) {
		message = "No events found for the user.";
	}
	return res.json({ status: 200, message: message, data: user.events, favorites: favorites.favorites});
});

router.get("/event/:id", async (req, res) => {
	const event = await Event.findById(req.params.id);

	return res.json({ status: 200, message: "Event found.", data: event });
});

router.delete("/events", async (req, res) => {
	const USER_ID = "62377afa8fa59b08a68aa786";
	const deletingResult = await Event.deleteMany()	

	if(deletingResult['acknowledged'] == true) {
		
		let message = ""
		if(deletingResult['deletedCount'] == 0) {
			message = "There is no event to delete"
		} else {
			message = `${deletingResult['deletedCount']} events deleted successfully`
			await Keyword.deleteMany();
			await User.updateMany({_id:USER_ID}, {$unset: {"events" : null}}, {multi:true})
			await User.updateMany({_id:USER_ID}, {$unset: {"favorites" : null}}, {multi:true})
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
		
		await User.updateOne({_id:USER_ID}, {'$pull': {"favorites": `${id}`}})

		if(event.keyword.length == 1) {
			await Keyword.deleteOne({ _id: event.keyword._id })
		} else {
			const newvalues = { $set: {length: event.keyword.length - 1 } };
			await Keyword.updateOne({_id: event.keyword._id}, newvalues, {upsert: true});
		}

		let message = "The event deleted successfully"

		if(deletingResult['deletedCount'] == 0) {
			message = "There is no event to delete"
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
		const favorites = await User.findById(USER_ID).populate("favorites", null, { keyword: searchedKeywordIsExist._id });
		
		if (user.events.length > 0) {
			return res.json({ status: 200, message: `Events found for the keyword ${keyword}.`, data: user.events, favorites:favorites.favorites });
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
		
		const eventLast = await User.findById(USER_ID).populate("events", null, { keyword: newKeyword._id });
		const favorites = await User.findById(USER_ID).populate("favorites", null, { keyword: newKeyword._id });

		return res.json({
			status: 200,
			message: `New events have been created for the keyword ${keyword}.`,
			data: eventLast.events,
			favorites:favorites.favorites
		});
	}
});

router.post("/favorite", async (req, res) => {
	const USER_ID = "62377afa8fa59b08a68aa786";
	const favoriteID = req.body.favoriteID;

	const isAll = req.query.All

	if(isAll == 1) {
		await User.updateMany({_id:USER_ID}, {$unset: {"favorites" : null}}, {multi:true})
		return res.json({ status: 200, message: 'All Events has been successfully removed from your favourites.' });
	}

	const isExist = await Event.findById(favoriteID);

	if (isExist === null) {
		return res.json({ status: 404, message: "The event does not exist." });
	}

	const user = await User.findById(USER_ID).populate("favorites", null, { _id: favoriteID });

	if (user.favorites.length > 0) {

		await User.updateOne({_id:USER_ID}, {'$pull': {"favorites": `${favoriteID}`}})

		return res.json({ status: 200, message: 'The event has been successfully removed from your favourites.' });
	}

	const event = await Event.findById(favoriteID);

	user.favorites.push(event);

	try {
		await user.save();
	} catch (err) {
		return res.status(500).send(err);
	}

	return res.json({ status: 200, message: 'The event has been successfully addd your favourites' });
});

router.get("/favorites", async (req,res) => {
	const USER_ID = "62377afa8fa59b08a68aa786";
	const user = await User.findById(USER_ID).populate("favorites");

	let message = `${user.favorites.length} Favorite events found for the user.`;
	if(user.favorites.length === 0) {
		message = "No favorite events found for the user.";
	}
	return res.json({ status: 200, message: message, data: user.favorites });
});

module.exports = router;
