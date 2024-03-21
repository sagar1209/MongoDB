db.places.insertOne({
  name: "Califorina Academy of Sciences",
  location: { type: "Point", coordinates: [-122.4724356, 37.7672544] },
});

db.places.createIndex({ location: "2dsphere" }); // it a special for geography

db.places.find({
  location: {
    $near: {
      $geometry: { type: "Point", coordinates: [-122.471114, 37.771104] },
    },
  },
});

// find area inside the polygon
db.places.find({
  location: {
    $geoWithin: {
      $geometry: { type: "Polygon", coordinates: [[p1, p2, p3, p4, p1]] },
    },
  },
});

// using cercle to find inside the cicle element
db.places.find({
  location: { $geoWithin: { $centerSphere: [[-122.46203, 37.77286],1/6378.1] } },
});
