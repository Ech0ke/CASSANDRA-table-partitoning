const cassandra = require("cassandra-driver");
const functions = require("./functions");
// Init connection
const client = new cassandra.Client({
  contactPoints: ["127.0.0.1"],
  localDataCenter: "datacenter1",
  keyspace: "ks1",
});

const dropTables = [
  "DROP TABLE IF EXISTS Driver;",
  "DROP TABLE IF EXISTS Car;",
  "DROP TABLE IF EXISTS Technical_Inspection;",
];

const createTables = [
  "CREATE TABLE IF NOT EXISTS Driver (driver_id INT, name TEXT, person_code INT, PRIMARY KEY (driver_id));",
  "CREATE TABLE IF NOT EXISTS Car (car_id INT, owner_id INT, make TEXT, model TEXT, year INT, color TEXT, PRIMARY KEY (car_id));",
  "CREATE TABLE IF NOT EXISTS Technical_Inspection (technical_inspection_id INT, car_id INT, datetime TIMESTAMP, is_pass BOOLEAN, description TEXT, PRIMARY KEY (technical_inspection_id));",
];

client
  .connect()
  .then(() => {
    console.log("Connected to Cassandra");
    // Use Promise.all to ensure all table creation commands are executed before proceeding
    return Promise.all(dropTables.map((table) => client.execute(table)));
  })
  .then(() => {
    console.log("Tables dropped successfully");
    // Use Promise.all to ensure all table creation commands are executed before proceeding
    return Promise.all(createTables.map((table) => client.execute(table)));
  })
  .then(() => {
    console.log("Tables created successfully");
    return functions.insertData(client); // Insert data after tables are created
  })
  .catch((err) => {
    console.error("Error:", err);
  });
