db.exmovieStarts.find({ genre: { $size: 2 } });

db.exmovieStarts.find({ "meta.aired": { $all: [2018] } }).pretty();

db.emovieStarts
  .find({
    ratings: { $elemMatch: { ratings: { $gt: 8 }, ratings: { $lt: 10 } } },
  })
  .pretty();
