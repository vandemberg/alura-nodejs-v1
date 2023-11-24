import mongoose from "mongoose";

function connect() {
  const username = process.env.MONGODB_USERNAME;
  const password = process.env.MONGODB_PASSWORD;
  const host = process.env.MONGODB_HOST;

  const url =
    `mongodb+srv://${username}:${password}@${host}/?retryWrites=true&w=majority`;
  mongoose
    .connect(url)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));
}

export default connect;
