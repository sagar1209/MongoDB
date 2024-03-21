// delete

// delete one and delete many

db.users.deleteMany({age :{$exists:true}})

db.users.deleteMany({})

db.users.drop() // return : true

db.dropdatabase;
