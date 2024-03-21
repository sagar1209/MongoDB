//  query selector
// it not chage the data in database and give at it is

// use movieData

db.movies.findOne({});
db.movies.find({ name: "tha last trip" });

// $eq,$ne,$gt,$lt,$gte,$lte

db.movies.find({ runtime: { $eq: 60 } });

// when use a embeded
db.movies.find({ "runtime.average": { $gt: 5 } });

// when to use a inside a array

db.movies.find({ genres: "Drama" }); //true for this genres : ["Drama","x","y","z"]
db.movies.find({ genres: ["Drama"] }); // exactly match this

// $in  , $nin

db.movies.find({ runtime: { $in: [10, 42] } });

// $or , $nor
db.movies.find({
  $or: [{ "runtime.average": { $lt: 4 } }, { "runtime.average": { $gt: 9 } }],
});

// &and
db.movies.find({
  $and: [{ genres: "Drama" }, { "runtime.average": { $gt: 9 } }],
});
db.movies.find({ genres: "Drama" }, { "runtime.average": { $gt: 9 } });

db.movies.find({ genres: "Drama" }, { genres: "Honors" }); // that time overright the value of genres you can use a and;

//  $ not
db.movies.find({ "runtime.average": { $ne: 5 } });

// $exits

///this is use to find a column exits or not

db.users.find({ age: { $exits: true, ne: null } });
// this is use to check the type of column
db.users.find({ age: { $type: "number" } });
db.users.find({ age: { $type: ["number", "string"] } });

// $regex
db.movies.find({ summary: { $regex: /musical/ } });

// $expre  -- this is use to compare to column in one documents

db.sales.find({ $expre: { $gt: ["$volume", "$target"] } });

// $size  // it exat match

db.users.find({ hobbies: { $size: 3 } });

// $all - this is use to not match the order
db.movieStarts.find({ genre: { $all: ["action", "thriller"] } });

// elemmatch

db.users.find({
  hobbies: { $elemMatch: { title: "Sports", frequency: { $gte: 3 } } },
});

// cursor
const dataCursors = db.movieData.find();
dataCursors.next();

dataCursors.forEach((doc) => {
  pritnjson(doc);
});

// sorting
db.movies.find().sort({ "rating.average": -1, runtime: 1 });
// skip and limit
db.movies.find().sort({ "rating.average": -1, runtime: 1 }).skip(1).limit(1); // this order is set mongodb automatically
// sort-> skip -> limit

//---
// projection
// it  not chamge the data in database and give a modify data

db.movies.find({},{name:1,_id:0,"network.name":1});
