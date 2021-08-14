const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  MONGO_CONNECTION_STRING: "mongodb+srv://trividha:HqBJzgxdxnxsq7LY@cluster0.szwa2.mongodb.net/oneshot_college?retryWrites=true&w=majority",
};