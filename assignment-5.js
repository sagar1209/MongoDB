db.sports.updateOne(
  { title: "Cricket" },
  { $set: { requiresTeam: true } },
  { upsert: true }
);

db.sports.updateOne(
  { title: "Table Tennis" },
  { $set: { requiresTeam: false } },
  { upsert: true }
);

// 2
db.sports.updateMany(
  { requiresTeam: true },
  { $set: { min_player_required: 11 } }
);

// 3
db.sports.updateMany(
    { requiresTeam: true },
    { $inc: { min_player_required: 10 } }
  );
   