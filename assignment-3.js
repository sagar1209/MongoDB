db.movieStarts.find({
  $and: [{ "meta.rating": { $gt: 9.2 } }, { "meta.runtime": { $lt: 100 } }]})


db.movieStarts.find({$or:[{genre : "drama"},{genre:"action"}]})


db.movieStarts.find({$expr: {$gt :["$visitors","$expectedVisitors"]}})
