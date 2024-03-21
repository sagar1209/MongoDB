db.contacts.aggregate([
  { $match: { "dob.age": { $gt: 50 } } },
  {
    $group: {
      _id: { gender: "$gender" },
      numPerson: { $sum: 1 },
      avgage: { $avg: "$dob.age" },
    },
  },
]);
