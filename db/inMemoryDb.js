const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const connectDB = async () => {
  const mongod = new MongoMemoryServer();

  const uri = await mongod.getUri();
  const port = await mongod.getPort();
  const dbPath = await mongod.getDbPath();
  const dbName = await mongod.getDbName();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect(uri, mongooseOpts);
  //   console.debug(uri, port, dbPath, dbName);
  // some code
  //   ... where you may use `uri` for as a connection string for mongodb or mongoose

  // you may check instance status, after you got `uri` it must be `true`
  //   console.debug(JSON.stringify(mongod.getInstanceInfo())); // return Object with instance data

  // you may stop mongod manually
  //   await mongod.stop();

  // when mongod killed, it's running status should be `false`
  //   console.debug(mongod.getInstanceInfo());

  // even you forget to stop `mongod` when you exit from script
  // special childProcess killer will shutdown it for you
};

module.exports = connectDB;
