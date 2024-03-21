// capped collection

db.createCollection("capped", { capped: true, size: 10000, max: 3 });

db.capped.insertOne({ name: "sagar" });
db.capped.insertOne({ name: "amit" });
db.capped.insertOne({ name: "harshil" });

// when insert more data so automatically delete oldest bcz max is 3
db.capped.insertOne({ name: "harshil" }); // delete a name:sagar
