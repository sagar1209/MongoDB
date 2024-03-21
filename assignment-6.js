db.places.insertOne({name: "Beergarden" , loc: {type: "Point", coordinates: [11.59228, 48.15203]}})

db.places.insertOne({name: "Oktoberfest" , loc: {type: "Point", coordinates: [11.54965, 48.13203]}})

db.places.insertOne({name: "My old palace" , loc: {type: "Point", coordinates: [11.56934, 48.15105]}})

db.places.find().pretty()

const myLocation=[11.59475, 48.14235]

db.places.createIndex({loc: "2dsphere"})


db.places.find({loc: {$geomentry:  {type: "Point", coordinates: myLocation}}}).pretty()


db.places.find({loc: {$geomentry:  {type: "Point", coordinates: myLocation}, $minDistance:500, $maxDistance:1000}}).pretty()


db.places.find({loc: {$geomentry:  {type: "Point", coordinates: myLocation}, $minDistance:1000, $maxDistance:2000}}).pretty()

db.places.find({loc: {$geomentry:  {type: "Point", coordinates: myLocation}, $minDistance:2000, $maxDistance:3000}}).pretty()

const p1 = [11.6097, 48.14522]

const p2 = [11.57142, 48.15416]

const p3 = [11.6, 48.15954]

const polygonArea= [[p1, p2, p3, p1]]

const polygonObject= {type: "Polygon",coordinates: polygonArea}

db.places.find({loc: {$geowithin: {$geometry: polygonObject}}}).pretty()

db.areas.insertOne({name: "Free Time well-Being Area", a: polygonObject})


db.areas.find({a: {$geoIntersects: {$geometry: {type:"Point",  coordinated: [11.59228, 48.15203]}}}}).pretty()

db.areas.createIndex({a: "2dsphere"})

db.areas.find({a: {$geoIntersects: {$geometry: {type: "Point", coordinates:[11.59228,48.15203]}}}}).pretty()
