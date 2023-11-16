"use strict";
const fs = require("fs");
const request = require("request");

const contentTypes = new Map([
	[".mp4", "video/mp4"],
	[".webm", "video/webm"],
]);

const action = async (context) => {
	const filePath = await context.filePath();

	context.setProgress("Uploading…");

	const formData = {
		image: fs.createReadStream(filePath),
	};

	context.notify("URL copied to the clipboard");
};

const config = {
	clientId: {
		title: "Client ID",
		type: "string",
		minLength: 40,
		default: "",
		required: true,
	},
	secretId: {
		title: "Secret ID",
		type: "string",
		minLength: 40,
		default: "",
		required: true,
	},
};

const youtube = {
	title: "Upload to YouTube",
	formats: ["mp4", "webm"],
	action,
	config,
};

exports.shareServices = [youtube];
