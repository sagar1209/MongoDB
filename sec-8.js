// update a one or more field and also select a one or  more
db.users.upadateMany(
  { "hobbies.title": "Sports" },
  { $set: { isSpotity: true, age: 30 } }
);

// $inc

db.users.updateOne(
  { name: "manual" },
  { $inc: { age: -1 }, $set: { isSpotity: false } }
);

db.users.updateOne(
  { name: "manual" },
  { $inc: { age: -1 }, $set: { age: 20 } }
); // this give me a error bcz you can use multiple inc,set but not use a same cloumn

// $min , $max ,$mul
db.users.updateOne({ name: "sagar" }, { $min: { age: 25 } });

db.users.updateOne({ name: "sagar" }, { $mul: { age: 2 } });

// $unset

db.users.updateMany({ isSpotity: true }, { $unset: { phone: "" } });

// $rename

db.users.updateOne({}, { $rename: { name: "full name" } });

// update a array
//.$ update only  one who match it  in first time
db.users.updateMany(
  { hobbies: { $elemMatch: { title: "Sports", frequency: { $gte: 3 } } } },
  { $set: { "hobbies.$.highFrequency": true } }
);

// $[]  update alll in the array

db.users.uodateMany(
  { age: { $gt: 20 } },
  { $inc: { "hobbies.$[].frequency": 10 } }
);

// $[el] update all who filter the el

db.users.updateMany(
  { "hobbies.frequency": { $gt: 2 } },
  { $set: { "hobbies.$[el].goodFrequency": true } },
  { arrayFilters: [{ "el.frequency": { $gt: 2 } }] }
);

// add element in araay
db.users.updateOne(
  { name: "harshila" },
  { $push: { hobbies: { title: "good wine", frequency: -1 } } }
);
// one or more add

db.users.updateOne(
  { name: "harshila" },
  {
    $push: {
      hobbies: {
        $each: [
          { title: "good game", frwquency: 1 },
          { title: "one most", frequency: 2 },
        ],
        $sort: { frequency: -1 },
      },
    },
  }
);

// pull , pop

db.users.updateOne(
  { name: "harshila" },
  { $pull: { hobbies: { title: "good wine" } } }
);

db.users.updateOne({ name: "harshila" }, { $pop: { hobbies: 1 } }); // remove last

db.users.updateOne({ name: "harshila" }, { $pop: { hobbies: -1 } }); // remove fisrt

// add to set

db.users.updateOne(
  { name: "harshila" },
  {
    $addToSet: {
      hobbies: { title: "good game", frwquency: 1 }
    },
  }
);
