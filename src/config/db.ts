import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost/frontier", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .catch((error) => {
    console.log(error);
  });

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Establishing database connection");
});
db.on("disconnecting", () => {
  console.log("Database disconnecting");
});
db.on("disconnected", () => {
  console.log("Database disconnected");
});
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected successfully");
});
