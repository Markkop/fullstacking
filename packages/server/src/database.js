const mongoose = require("mongoose");

export function connectDatabase() {
  databaseUrl = "mongodb://127.0.0.1:27017/test";
  mongoose.connect(databaseUrl, { useNewUrlParser: true });
  mongoose.connection.once("open", () => {
    console.log(`Connected to database: ${databaseUrl}`);
  });
}
