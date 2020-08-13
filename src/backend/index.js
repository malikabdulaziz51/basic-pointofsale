const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("./jwt");
const Users = require("./models/user_schema");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");

require("./db");
const app = express();
app.use(cors());
app.use(express.static(__dirname + "/uploaded"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", function(req, res, next) {
	return res.send("Hello nodejs");
});

app.post("/register", async (req, res) => {
	try {
		req.body.password = await bcrypt.hash(req.body.password, 8);
		await Users.create(req.body);
		res.json({ result: "success", message: "Register successfully" });
	} catch (err) {
		res.json({ result: "error", message: err.errmsg });
	}
});

app.post("/login", async (req, res) => {
	let user = await Users.findOne({ username: req.body.username });
	if (user) {
		if (bcrypt.compareSync(req.body.password, user.password)) {
			const payload = {
				id: user._id,
				level: user.level,
				username: user.username
			};

			let token = jwt.sign(payload);
			console.log(token);
			res.json({ result: "success", token, message: "Login Successfully" });
		} else {
			res.json({ result: "error", message: "Invalid password" });
		}
	} else {
		res.json({ result: "error", message: "Invalid user" });
	}
});

app.get("/profile/id/:id", async (req, res) => {
	let user = await Users.findOne({ _id: req.params.id });
	res.json(user);
});

uploadImage = async (files, user) => {
	if (files.avatars != null) {
		var fileExtension = files.avatars.name.split(".").pop();
		user.avatars = `${Date.now()}+${user.username}.${fileExtension}`;
		var newPath =
			path.resolve(__dirname + "/uploaded/images/") + "/" + user.avatars;
		// console.log(fs.exists(newPath));
		// if (fs.exists(newPath)) {
		// 	await fs.remove(newPath);
		// }

		// await fs.renameSync(files.avatars.path, newPath, (err) => {
		// 	if (err) throw err;
		// 	console.log("Rename complete!");
		// });

		var readStream = fs.createReadStream(files.avatars.path);
		var writeStream = fs.createWriteStream(newPath);
		readStream.pipe(writeStream);
		await readStream.on("end", function() {
			fs.unlinkSync(files.avatars.path);
		});

		await Users.findOneAndUpdate({ _id: user.id }, user);
	}
};

app.put("/profile", async (req, res) => {
	try {
		var form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			let user = await Users.findOneAndUpdate({ _id: fields.id }, fields);
			await uploadImage(files, fields);
			res.json({ result: "success", message: "Updated Successfully!" });
		});
	} catch (err) {
		res.json({ result: "error", message: err.errmsg });
	}
});

const port = 8080;
app.listen(port, () => {
	console.log("Server is running on port " + port);
});
