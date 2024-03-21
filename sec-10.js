db.contacts.explain("executionStats").find({ "dob.age": { $gt: 60 } });

/// create a index
db.contacts.createIndex({ "dob.age": 1 });

// drop index
db.contacts.dropIndex({ "dob.age": 1 });

// create multiple compaund
db.contacts.createIndex({ "dob.age": 1, gender: 1 });

db.contacts.explain("executionStats").find({ "dob.age": 35, gender: "male" }); // index scan

db.contacts.explain("executionStats").find({ gender: "male" }); // collscan

// index use from only start you can not use in between

db.contacts.explain("executionStats").find({ "dob.age": 35 }); // index scan

// index is not only use for the finding documents but also use to sort
db.contacts
  .explain("executionStats")
  .find({ "dob.age": 35 })
  .sort({ gender: 1 }); // indes scan

// it is use for data unique
db.contacts.createIndex({ email: 1 }, { unique: true });

// partial indexing

db.contecta.createIndex(
  { "dob.age": 1 },
  { partialFilterExpression: { gender: "male" } }
); /// only for give index to match that both condition // this is faster

db.contacts.explain("executionStats").find({ age: 35 }); // this is use clecscan
// bcz mongodb give a better solution

/// index also use  for live timer

db.sessions.createIndex({ createAt: 1 }, { expireAfterSeconds: 10 });

// MULTYKEY INDEX
// like a array and embeded document

db.contacts.createIndex({ hobbies: 1 });

db.contacts.find({ hobbies: "sports" }); // index scan // bcz store all index in tyoe of value

db.contacts.createIndex({ address: 1 });

db.contacts.find({ "address.street": "main street" }); // coll scan // bcz all documents to use for indexing

// useing two multykey you can not create a indexing

db.contacts.createIndex({ address: 1, hobbies: 1 }); // error

db.contacts.createIndex({ name: 1, hobbies: 1 }); // not give a error

// text indexs

db.products.createIndex({ documents: "text" });

db.products.find({ $text: { $search: "book" } });

// find score
db.products.find(
  { $text: { $search: "awesime Tshirt" } },
  { score: { $meta: "textScore" } }
);

db.products.createIndex({ title: "text" }); // errro bcz only create one text index

// but you create index in combining

db.products.createIndex({ title: "text", description: "text" });

// EXCUDING

db.products.find({ $text: { $search: "awesome -Tshirt" } });

/// you can also add a deafult language and weights

db.products.createIndex(
  { title: "text", description: "text" },
  { default_language : "german" , weights :{title:1,description :10}}
);

/// index create a two different way 
// 1 -  foreground   2- background
// when create a index        when create a index 
// thst timme blok the        that time not block 
// collenction                the collection

// by default backgrouond - false;
// so above we have created all indexes is a foreground

db.products.createIndex({name : 1} ,{background : true})