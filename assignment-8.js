// use admin
db.createUser({user: "sa", pwd: "P@ssw0rd", roles: ["userAdminAnyDatabase"]})
// use customerData
db.createUser({user: "customerAdmin", pwd: "admin", roles:["userAdmin"]})
db.createUser({user: "customerUser", pwd: "user", roles:["readWrite"]})