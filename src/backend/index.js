const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
require("./db");
const Users = require("./models/user_schema");
const jwt = require("./jwt");

app.use(cors());
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

const port = 8080;
app.listen(port, () => {
	console.log("Server is running on port " + port);
});
