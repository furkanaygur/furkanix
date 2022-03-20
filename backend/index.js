const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();

app.use(cors({ origin: true, credentials: true }));

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	next();
});

mongoose
	.connect(
		`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.CLUSTER_NAME}.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`,
		{ useNewUrlParser: true, useUnifiedTopology: true }
	) 
	.then(() => console.log(`MongoDB is working. ${process.env.MONGODB_USERNAME} | ${process.env.MONGODB_NAME}`))
	.catch((err) => console.log(`Error: MongoDB is not working !!! ${err}`));

// Routes
var event = require("./routes/event");

// Using Routes
app.use("/api", event);

app.get("/", (req, res) => {
	res.send("Backend is working ... Please go to /api/events");
});

app.listen(process.env.PORT || 8080, function () {
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
