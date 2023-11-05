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
  "DROP TABLE IF EXISTS DriverByPersonCode;",
  "DROP TABLE IF EXISTS Car;",
  "DROP TABLE IF EXISTS CarByYear;",
  "DROP TABLE IF EXISTS TechnicalInspection;",
  "DROP TABLE IF EXISTS TechnicalInspectionByCarId;",
  "DROP TABLE IF EXISTS CarByMake;",
];

const createTables = [
  "CREATE TABLE IF NOT EXISTS Driver (driver_id INT, name TEXT, person_code INT, PRIMARY KEY ((driver_id), name));",
  "CREATE TABLE IF NOT EXISTS Car (car_id INT, driver_id INT, make TEXT, model TEXT, year INT, color TEXT, PRIMARY KEY ((car_id), make, model));",
  "CREATE TABLE IF NOT EXISTS TechnicalInspection (technical_inspection_id INT, car_id INT, datetime TIMESTAMP, is_pass BOOLEAN, description TEXT, PRIMARY KEY ((technical_inspection_id), car_id, is_pass));",
];

client
  .connect()
  .then(() => {
    console.log("Connected to Cassandra");
    return Promise.all(dropTables.map((table) => client.execute(table)));
  })
  .then(() => {
    console.log("Tables dropped successfully");
    return Promise.all(createTables.map((table) => client.execute(table)));
  })
  .then(async () => {
    console.log("Tables created successfully");
    return await functions.createPartitionTables(client);
  })
  .then(async () => {
    console.log("Partition tables created successfully");
    return await functions.insertData(client);
  })
  .then(async () => {
    return await functions.executeQueries(client);
  })
  .then(() => {
    // Close the Cassandra connection
    client.shutdown();
  })
  .catch((err) => {
    console.error("Error:", err);
    client.shutdown();
  });
