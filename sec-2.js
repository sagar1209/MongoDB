// use flights

// flights data
[
  {
    departureAirport: "MUC",
    arrivalAirport: "SFO",
    aircraft: "Airbus A380",
    distance: 12000,
    intercontinental: true,
  },
  {
    departureAirport: "LHR",
    arrivalAirport: "TXL",
    aircraft: "Airbus A320",
    distance: 950,
    intercontinental: false,
  },
];

db.flightData.insertOne({ _id: "txl-hr-1" });

db.flightData.find().pretty();

db.flightData.deleteOne({ key: value });

db.flightData.updateOne({ distance: 12000 }, { $set: { marker: "delete" } });

db.flightData.updateMany({}, { $set: { marker: "toDelete" } });

db.flightData.deleteMany({ marker: "toDelete" });

db.passengers.find().forEach((passengerData) => {
  printjson(passengerData);
});

db.passengers.findOne();

db.passengers.findOne().pretty(); // error coz pretty() is for multiple docs

db.passengers.find({}, { name: 1 }).pretty(); // Here, it will default display _id

db.passengers.find({}, { name: 1, _id: 0 }).pretty();

db.flights.updateMany(
  {},
  { $set: { status: { description: "on-time", lastUpdated: "1 hour ago" } } }
);

db.flights.updateMany(
  {},
  {
    $set: {
      status: {
        description: "on-time",
        lastUpdated: "1 hour ago",
        details: { responsible: "Colt Steele" },
      },
    },
  }
);

// passenger data
[
  {
    name: "Max Schwarzmueller",
    age: 29,
  },
  {
    name: "Manu Lorenz",
    age: 30,
  },
  {
    name: "Chris Hayton",
    age: 35,
  },
  {
    name: "Sandeep Kumar",
    age: 28,
  },
  {
    name: "Maria Jones",
    age: 30,
  },
  {
    name: "Alexandra Maier",
    age: 27,
  },
  {
    name: "Dr. Phil Evans",
    age: 47,
  },
  {
    name: "Sandra Brugge",
    age: 33,
  },
  {
    name: "Elisabeth Mayr",
    age: 29,
  },
  {
    name: "Frank Cube",
    age: 41,
  },
  {
    name: "Karandeep Alun",
    age: 48,
  },
  {
    name: "Michaela Drayer",
    age: 39,
  },
  {
    name: "Bernd Hoftstadt",
    age: 22,
  },
  {
    name: "Scott Tolib",
    age: 44,
  },
  {
    name: "Freddy Melver",
    age: 41,
  },
  {
    name: "Alexis Bohed",
    age: 35,
  },
  {
    name: "Melanie Palace",
    age: 27,
  },
  {
    name: "Armin Glutch",
    age: 35,
  },
  {
    name: "Klaus Arber",
    age: 53,
  },
  {
    name: "Albert Twostone",
    age: 68,
  },
  {
    name: "Gordon Black",
    age: 38,
  },
];
// array in a document
db.passengers.updateOne({name: "Gordon Black"}, {$set: {hobbies: ["sports", "cooking", "art"]}})

// projection
db.passengers.findOne({name: 'Gordon Black'}).hobbies

 db.passengers.find({hobbies: "sports"}).pretty()