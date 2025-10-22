const mongoose = require("mongoose");

module.exports = () => {
	const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
	try {
		mongoose.connect("mongodb://127.0.0.1:27017" , connectionParams);
		console.log("Connected to database successfully");
	} catch (error) {
		console.log(error);
		console.log("Could not connect database!");
	}
	try {
		
		// Attempt MongoDB operation
	  } catch (error) {
		if (error instanceof ServerSelectionError) {
		  console.error("Unable to select a MongoDB server:", error.message);
		} else {
		  console.error("Unexpected error:", error);
		}
	  }
	  
};