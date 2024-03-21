// match
db.contacts.aggregate([{ $match: { gender: "female" } }]);

// group
db.contacts.aggregate([
  { $match: { gender: "female" } },
  { $group: { _id: { state: "$location.state" }, totalPersons: { $sum: 1 } } },
]);

// sort
db.contacts.aggregate([
  { $match: { gender: "female" } },
  { $group: { _id: { state: "$location.state" }, totalPersons: { $sum: 1 } } },
  { $sort: { totalPerson: -1 } },
]);

// use project some retrive a specific deta

db.persons
  .aggregate([
    {
      $project: {
        _id: 0,
        name: 1,
        email: 1,
        birthdate: { $toDate: "$dob.date" }, // this is a sortcut to direct convert
        age: "$dob.age",
        location: {
          type: "Point",
          coordinates: [
            {
              $convert: {
                input: "$location.coordinates.longitude",
                to: "double",
                onError: 0.0,
                onNull: 0.0,
              },
            },
            {
              $convert: {
                input: "$location.coordinates.latitude",
                to: "double",
                onError: 0.0,
                onNull: 0.0,
              },
            },
          ],
        },
      },
    },
    {
      $project: {
        gender: 1,
        email: 1,
        location: 1,
        birthdate: 1,
        age: 1,
        fullName: {
          $concat: [
            { $toUpper: { $substrCP: ["$name.first", 0, 1] } },
            {
              $substrCP: [
                "$name.first",
                1,
                { $subtract: [{ $strLenCP: "$name.first" }, 1] },
              ],
            },
            " ",
            { $toUpper: { $substrCP: ["$name.last", 0, 1] } },
            {
              $substrCP: [
                "$name.last",
                1,
                { $subtract: [{ $strLenCP: "$name.last" }, 1] },
              ],
            },
          ],
        },
      },
    },
    {
      $group: {
        _id: { birthYear: { $isoYear: "$birthdate" } },
        numPerson: { $sum: 1 },
      },
    },
    { $out: "transformedPersons" },
  ])
  .pretty();

// push element into array
db.friends.aggregate([
  { $group: { _id: { age: "$age" }, allHobbies: { $push: "$hobbies" } } },
]);

// unwind is use to one to many
db.friends.aggregate([
  { $unwind: "$hobbies" },
  { $group: { _id: { age: "$age" }, allHobbies: { $push: "$hobbies" } } },
]);

// addToSet is use to not duplicate value in array
db.friends.aggregate([
  { $unwind: "$hobbies" },
  { $group: { _id: { age: "$age" }, allHobbies: { $addToSet: "$hobbies" } } },
]);

//  projection in array
db.friends.aggregate([
  { $project: { _id: 0, examScore: { $slice: ["$examScores", 1] } } },
]);

//  size of the array

db.friends.aggregate([
  { $project: { _id: 0, numScore: { $size: "$examScores" } } },
]);

// filter array
db.friends.aggregate([
  {
    $project: {
      _id: 0,
      scores: {
        $filter: {
          input: "$examScores",
          as: "sc",
          cond: { $gt: ["$$sc.score", 60] },
        },
      },
    },
  },
]);

// appling multiple opration in array

db.friends.aggregate([
  { $unwind: "$examScores" },
  { $project: { _id: 1, score: "$examScores.score" } },
  { $group: { _id: "$_id", maxscore: { $max: "$score" } } },
]);

// create bucket

db.contacts
  .aggregate([
    {
      $bucket: {
        groupBy: "$dob.age",
        boundaries: [18, 30, 40, 50, 60, 120],
        output: {
          numPersons: { $sum: 1 },
          averageAge: { $avg: "$dob.age" },
        },
      },
    },
  ])
  .pretty();

// auto bucket
db.contacts
  .aggregate([
    {
      $bucketAuto: {
        groupBy: "$dob.age",
        buckets: 5,
        output: {
          numPersons: { $sum: 1 },
          averageAge: { $avg: "$dob.age" },
        },
      },
    },
  ])
  .pretty();

// limit  // skip

db.contacts.aggregate([
  { $match: { gender: "male" } },
  { $project: { _id: 0, name: 1, birthDate: { $toDate: "$dob.date" } } },
  { $sort: { birthDate: 1 } },
  { $skip: 10 },
  { $limit: 10 },
  {$out:"temp"}
]);


// geonear

db.transformedPersons.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [-18.4, -42.8]
        },
        maxDistance: 1000000,
        num: 10,
        query: { age: { $gt: 30 } },
        distanceField: "distance"
      }
    }
  ]).pretty();
