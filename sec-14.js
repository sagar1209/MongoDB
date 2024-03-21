// authentication and authorization
db.createUser({ user: "max", pwd: "max", roles: ["userAdminAnyDatabase"] });

// using this command to logIn with the user //  mongosh "mongodb+srv://cluster0.cxu8qnq.mongodb.net/" --username appdev

// update user
db.updateUser("appdev", {
  roles: ["readWrite", { role: "readWrite", db: "blog" }],
});

//get user
db.getUser("appdev");
