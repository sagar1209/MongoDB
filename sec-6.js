db.persons.insertOne({name:"Max",age:30,hobbies:["Sports","Cooking"]})
// {
//   acknowledged: true,
//   insertedId: ObjectId("65d31c16ccd30f8b66dac443")}


db.persons.insert({name:"sagar",age:20})

// {
//   acknowledged: true,
//   insertedIds: { '0': ObjectId("65d31cf9ccd30f8b66dac444") }
// }


// db.persons.insert([{name:"sagar",age:20},{name:"amit",age:30}])
// {
//   acknowledged: true,
//   insertedIds: {
//     '0': ObjectId("65d31d19ccd30f8b66dac445"),
//     '1': ObjectId("65d31d19ccd30f8b66dac446")
//   }
// }


// you can always use insertOne or InsertMany



db.hobbies.insertMany([{_id:"sports",name:"Sports"},{_id:"cooking",name:"Cooking"}])
// { acknowledged: true, insertedIds: { '0': 'sports', '1': 'cooking' } }

db.hobbies.insertMany([{_id:"hiking",name:"Hiking"},{_id:"cooking",name:"Cooking"}])
// Uncaught:
// MongoBulkWriteError: E11000 duplicate key error collection: contactData.hobbies index: _id_ dup key: { _id: "cooking" }
// Result: BulkWriteResult {
//   insertedCount: 1,
//   matchedCount: 0,
//   modifiedCount: 0,
//   deletedCount: 0,
//   upsertedCount: 0,
//   upsertedIds: {},
//   insertedIds: { '0': 'hiking', '1': 'cooking' }
db.hobbies.find()
[
    { _id: 'sports', name: 'Sports' },
    { _id: 'cooking', name: 'Cooking' },
    { _id: 'hiking', name: 'Hiking' }
  ]
// query run in order 
// this never use a roolback 

db.hobbies.insertMany([{_id:"hiking",name:"Hiking"},{_id:"gaming",name:"Gaming"}],{ordered:false})   // if you write a ordered = false so that time not a maintain a order  ans run first who is not a get a error


// write Consern
db.persons.insertOne({name:"annanya",age:30},{writeConcern:{w:0}})
// {
//   acknowledged: false,
//   insertedId: ObjectId("65d32909ccd30f8b66dac447")
// }

db.persons.insertOne({name:"annanya",age:30},{writeConcern:{w:1,j:true,wtimeout:0.0001}})
// {
//   acknowledged: true,
//   insertedId: ObjectId("65d32934ccd30f8b66dac449")
// }


// mongoimport 

// mongoimport tv-shows.json -d movieData -c movies --jsonArray --drop  // drop use when collaction is exit then first drop and recreate , jsonArray is use a insert a bunch of data 




