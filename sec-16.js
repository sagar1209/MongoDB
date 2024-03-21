const session = db.getMongo().startsession();
const postsColl = session.getDatabase("blog").posts;
const usersColl = session.getDatabase("blog").users;
session.starttransaction();
usersColl.deleteOne({ _id: ObjectId("65d72c283feb1da287bfed56") });
postsColl.deleteMany({ _id: ObjectId("65d72c283feb1da287bfed56") });
session.commitTransaction();
