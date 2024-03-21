// int 32 bit

db.persons.insertOne({ age: 19 }); // by default it store a 64 bit floating

db.persons.insertOne({ age: NumberInt("19") }); // that time  it store in 32 bit

// int 64 bit

db.company.insertOne({ valuation: NumberLong("123456789123456789") }); // that time it store in 64 bit

// double

db.science.insertOne({ a: 0.3, b: 0.1 }); // float // we add subtrack two number so give me result like this : .19999999999998

/// you don't lose something so that time help a high presition

db.science.insertOne({ a: NumberDecimal("0.3"), b: NumberDecimal("0.1") });
