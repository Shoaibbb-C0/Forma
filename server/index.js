require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./server");
const port = process.env.PORT || 5000;

async function start() {
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("MongoDB connected");
    } catch (error) {
      console.error("MongoDB unavailable:", error.message);
    }
  }
  app.listen(port, () => console.log(`Forma API listening on ${port}`));
}
start();
