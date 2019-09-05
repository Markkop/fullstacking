const mongoose = require("mongoose");

export async function connectDatabase() {
  try {
    const databaseUrl = "mongodb://127.0.0.1:27017/test";
    await mongoose.connect(databaseUrl, { useNewUrlParser: true });
    mongoose.connection.once("open", () => {
      console.log(`Connected to database: ${databaseUrl}`);
    });
  } catch (err) {
    console.log(err.name);
  }
}
