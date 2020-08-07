var mongoose = require("mongoose");

mongoose.connect(
	"mongodb+srv://malik:admin123@cluster0-pegnq.mongodb.net/test?retryWrites=true&w=majority",
	{ useNewUrlParser: true }
);

mongoose.connection.on("connected", function() {
	console.log("Mongoose default connection open");
});

mongoose.connection.on("error", function(err) {
	console.log("Mongoose default connectio error" + err);
});

mongoose.connection.on("disconnected", function() {
	console.log("Mongoose default connectio disconnected");
});

process.on("SIGINT", function() {
	mongoose.connection.close(function() {
		console.log(
			"Mongoose default connection disconnected through app termination"
		);
		process.exit(0);
	});
});
