const driversData = [
  { driver_id: 1, name: "John Doe", person_code: 12345 },
  { driver_id: 2, name: "Alice Smith", person_code: 67890 },
  { driver_id: 3, name: "Alex Brown", person_code: 19816 },
  { driver_id: 4, name: "Eve Anderson", person_code: 98765 },
  { driver_id: 5, name: "Charlie Brown", person_code: 24680 },
];

const carsData = [
  {
    car_id: 1,
    make: "Toyota",
    model: "Camry",
    year: 2020,
    color: "Blue",
    driver_id: 1,
  },
  {
    car_id: 2,
    make: "Honda",
    model: "Civic",
    year: 2019,
    color: "Red",
    driver_id: 2,
  },
  {
    car_id: 3,
    make: "Ford",
    model: "Focus",
    year: 2021,
    color: "Silver",
    driver_id: 3,
  },
  {
    car_id: 4,
    make: "Nissan",
    model: "Altima",
    year: 2018,
    color: "Black",
    driver_id: 3,
  },
  {
    car_id: 5,
    make: "Chevrolet",
    model: "Malibu",
    year: 2022,
    color: "White",
    driver_id: 5,
  },
  {
    car_id: 6,
    make: "Nissan",
    model: "GT-R",
    year: 2022,
    color: "White",
    driver_id: 4,
  },
];

const technicalInspectionData = [
  {
    technical_inspection_id: 1,
    car_id: 1,
    datetime: new Date(),
    is_pass: true,
    description: "Passed inspection",
  },
  {
    technical_inspection_id: 2,
    car_id: 2,
    datetime: new Date("2018-10-05"),
    is_pass: false,
    description: "Failed inspection. Light spectrum needs correction.",
  },
  {
    technical_inspection_id: 3,
    car_id: 2,
    datetime: new Date("2020-10-01"),
    is_pass: true,
    description: "Passed inspection",
  },
  {
    technical_inspection_id: 4,
    car_id: 2,
    datetime: new Date("2022-09-30"),
    is_pass: false,
    description: "Failed inspection",
  },
  {
    technical_inspection_id: 5,
    car_id: 3,
    datetime: new Date("2020-12-10"),
    is_pass: true,
    description: "Passed inspection",
  },
  {
    technical_inspection_id: 6,
    car_id: 3,
    datetime: new Date("2022-01-05"),
    is_pass: false,
    description: "Failed inspection",
  },
  {
    technical_inspection_id: 7,
    car_id: 4,
    datetime: new Date("2023-12-20"),
    is_pass: true,
    description: "Passed inspection",
  },
  {
    technical_inspection_id: 8,
    car_id: 5,
    datetime: new Date("2022-02-15"),
    is_pass: true,
    description: "Passed inspection",
  },
  {
    technical_inspection_id: 9,
    car_id: 2,
    datetime: new Date("2023-11-05"),
    is_pass: true,
    description: "Passed inspection",
  },
];

module.exports = { driversData, carsData, technicalInspectionData };
