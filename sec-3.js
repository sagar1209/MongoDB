db.patients.insertOne({
  name: "Max",
  age: 29,
  diseaseSummary: { diseases: ["cold", "broken leg"] },
});
var dsid = db.patients.findOne().diseaseSummary;

db.diseaseSummary.findOne({ _id: dsid });

// one to one

db.persons.insertOne({ name: "emily", age: 30, salary: 20000 });
db.cars.insertOne({
  model: "BMW",
  price: 200000,
  owner: ObjectId("65d2da390b17b58e527b59df"),
});
db.cars.find();

db.users.insertMany([
  { name: "sagar", age: 20, email: "sagar@test.com" },
  { name: "Manuel Lorenz", age: 30, email: "manu@test.com" },
]);

db.createCollection("posts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "text", "creator", "comments"],
      properties: {
        title: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        text: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        creator: {
          bsonType: "objectId",
          description: "must be an objectid and is required",
        },
        comments: {
          bsonType: "array",
          description: "must be an array and is required",
          items: {
            bsonType: "object",
            required: ["text", "author"],
            properties: {
              text: {
                bsonType: "string",
                description: "must be a string and is required",
              },
              author: {
                bsonType: "objectId",
                description: "must be an objectid and is required",
              },
            },
          },
        },
      },
    },
  },
});

// using this validation to add the data but give the warning and store the warning in log data

db.runCommand({
  collMod: "posts",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "text", "creator", "comments"],
      properties: {
        title: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        text: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        creator: {
          bsonType: "objectId",
          description: "must be an objectid and is required",
        },
        comments: {
          bsonType: "array",
          description: "must be an array and is required",
          items: {
            bsonType: "object",
            required: ["text", "author"],
            properties: {
              text: {
                bsonType: "string",
                description: "must be a string and is required",
              },
              author: {
                bsonType: "objectId",
                description: "must be an objectid and is required",
              },
            },
          },
        },
      },
    },
  },
  validationAction: "warn",
});
