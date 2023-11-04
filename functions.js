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

    // Insert data into the Car table
    for (const car of data.carsData) {
      await client.execute(
        "INSERT INTO Car (car_id, owner_id, make, model, year, color) VALUES (?, ?, ?, ?, ?, ?)",
        [car.car_id, car.owner_id, car.make, car.model, car.year, car.color],
        { prepare: true }
      );
    }

    // Insert data into the Technical_Inspection table
    for (const inspection of data.technicalInspectionData) {
      await client.execute(
        "INSERT INTO Technical_Inspection (technical_inspection_id, car_id, datetime, is_pass, description) VALUES (?, ?, ?, ?, ?)",
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

module.exports = { insertData };
