const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
var config = require("./config");

// var publicKEY = fs.readFileSync(
// 	path.join(__dirname + "https://soshace-12d3e.kxcdn.com/public.key"),
// 	"utf8"
// );

// var privateKEY = fs.readFileSync(
// 	path.join(__dirname + "https://soshace-12d3e.kxcdn.com/private.key"),
// 	"utf8"
// );

// var i = "Krissio";
// var s = "admin@kriss.io";
// var a = "https://kriss.io";

module.exports = {
	sign: (payload) => {
		// var signOptions = {
		// 	issuer: i,
		// 	subject: s,
		// 	audience: a,
		// 	expiresIn: "30d",
		// 	algorithm: "RS256"
		// };
		return jwt.sign(payload, config.secret);
	}
};
