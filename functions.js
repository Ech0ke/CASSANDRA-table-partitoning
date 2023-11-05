const data = require("./data");

const insertData = async (client) => {
  try {
    // Insert data into the Driver table
    for (const driver of data.driversData) {
      await client.execute(
        "INSERT INTO Driver (driver_id, name, person_code) VALUES (?, ?, ?)",
        [driver.driver_id, driver.name, driver.person_code],
        { prepare: true }
      );
    }

    for (const driver of data.driversData) {
      await client.execute(
        "INSERT INTO DriverByPersonCode (driver_id, name, person_code) VALUES (?, ?, ?)",
        [driver.driver_id, driver.name, driver.person_code],
        { prepare: true }
      );
    }

    // Insert data into the Car table
    for (const car of data.carsData) {
      await client.execute(
        "INSERT INTO Car (car_id, driver_id, make, model, year, color) VALUES (?, ?, ?, ?, ?, ?)",
        [car.car_id, car.driver_id, car.make, car.model, car.year, car.color],
        { prepare: true }
      );
    }

    for (const car of data.carsData) {
      await client.execute(
        "INSERT INTO CarByYear (year, car_id, driver_id, make, model, color) VALUES (?, ?, ?, ?, ?, ?)",
        [car.year, car.car_id, car.driver_id, car.make, car.model, car.color],
        { prepare: true }
      );
    }

    for (const car of data.carsData) {
      await client.execute(
        "INSERT INTO CarByMake (year, car_id, driver_id, make, model, color) VALUES (?, ?, ?, ?, ?, ?)",
        [car.year, car.car_id, car.driver_id, car.make, car.model, car.color],
        { prepare: true }
      );
    }

    // Insert data into the Technical_Inspection table
    for (const inspection of data.technicalInspectionData) {
      await client.execute(
        "INSERT INTO TechnicalInspection (technical_inspection_id, car_id, datetime, is_pass, description) VALUES (?, ?, ?, ?, ?)",
        [
          inspection.technical_inspection_id,
          inspection.car_id,
          inspection.datetime,
          inspection.is_pass,
          inspection.description,
        ],
        { prepare: true }
      );
    }
    console.log("Data inserted successfully.");
  } catch (error) {
    console.error("Error inserting data:", error);
  }
};

const createPartitionTables = async (client) => {
  try {
    const createPartitionedTableQueries = [
      "CREATE TABLE IF NOT EXISTS CarByYear (year INT, car_id INT, make TEXT, model TEXT, color TEXT, driver_id INT, PRIMARY KEY ((year), car_id, driver_id));",
      "CREATE TABLE IF NOT EXISTS CarByMake (make TEXT, model TEXT, car_id INT, driver_id INT, year INT, color TEXT, PRIMARY KEY ((make), model, car_id));",
      "CREATE TABLE IF NOT EXISTS DriverByPersonCode (driver_id INT, name TEXT, person_code INT, PRIMARY KEY ((person_code), name));",
    ];
    for (const query of createPartitionedTableQueries) {
      await client.execute(query);
    }
    console.log("Partitioned tables created successfully.");
  } catch (error) {
    console.error("Error creating partitioned table:", error);
  }
};

const executeQueries = async (client) => {
  try {
    const query1 =
      "SELECT driver_id, model, year, color FROM CarByMake WHERE make = 'Nissan';";
    const query1Result = await client.execute(query1);
    let carData = query1Result.rows;
    const driverIds = carData.map((row) => row.driver_id);

    const query2 = "SELECT name, driver_id FROM Driver WHERE driver_id IN ?;";
    const query2Result = await client.execute(query2, [driverIds], {
      prepare: true,
    });
    console.log(`\nDrivers that own Nissan cars:`);
    console.log(
      `${"Driver Name".padEnd(18)}${"Car Make".padEnd(10)}${"Car Model".padEnd(
        10
      )}${"Car Year".padEnd(10)}${"Car Color".padEnd(10)}`
    );
    let i = 0;
    query2Result.rows.forEach((driver) => {
      const carInfo = carData.find((car) => car.driver_id === driver.driver_id);
      console.log(
        `${driver.name.padEnd(18)}${"Nissan".padEnd(10)}${carInfo.model.padEnd(
          10
        )}${carInfo.year.toString().padEnd(10)}${carInfo.color.padEnd(10)}`
      );
    });

    const query3 = "SELECT car_id, make, model, year FROM Car;";
    const query3Result = await client.execute(query3);
    carData = query3Result.rows;
    const carIds = carData.map((row) => row.car_id);
    const query4 =
      "SELECT datetime, car_id, is_pass FROM TechnicalInspection WHERE car_id IN ? AND is_pass = TRUE;";
    const query4Result = await client.execute(query4, [carIds], {
      prepare: true,
    });
    console.log("\nCars that passed technical Inspections:");
    console.log(
      `${"Datetime".padEnd(30)}${"Car ID".padEnd(12)}${"Car Make".padEnd(
        10
      )}${"Car Model".padEnd(10)}${"Car Year".padEnd(10)}${"Is Pass".padEnd(
        10
      )}`
    );

    query4Result.rows.forEach((inspection) => {
      const formattedDatetime = inspection.datetime
        .toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
        .padEnd(30);

      const carInfo = carData.find((car) => car.car_id === inspection.car_id);

      console.log(
        `${formattedDatetime}${inspection.car_id
          .toString()
          .padEnd(12)}${carInfo.make.padEnd(10)}${carInfo.model.padEnd(
          10
        )}${carInfo.year.toString().padEnd(10)}${inspection.is_pass
          .toString()
          .padEnd(10)}`
      );
    });
  } catch (error) {
    console.error("Error creating partitioned table:", error);
  }
};

module.exports = { insertData, createPartitionTables, executeQueries };
