const mongoose = require("mongoose");
require("dotenv").config();

// Connect to database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));
//schema
const personSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  favoriteFoods: { type: [String], required: true },
});
//model
const Person = mongoose.model("Person", personSchema);
// Create person (create a document)

const createPerson = async () => {
  const person = new Person({
    firstName: "John Doe",
    age: 30,
    favoriteFoods: ["sushi", "apple"],
  });
  try {
    const result = await person.save();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
createPerson();

//Create  persons
const createpersons = async (persons) => {
  try {
    const result = await Person.create(persons);
    console.log(result);
  } catch (err) {
    console.error("Error:", err.message);
  }
};
createpersons([
  {
    firstName: "Jane",
    age: 30,
    favoriteFoods: ["sushi", "apple"],
  },
  {
    firstName: "John",
    age: 30,
    favoriteFoods: ["kouskous", "apple"],
  },
  {
    firstName: " Doe",
    age: 30,
    favoriteFoods: ["spagetti", "apple"],
  },
]);
//Get persons
Person.find({ firstName: "John" })
  .then((people) => {
    console.log(people);
  })
  .catch((error) => {
    console.error(error);
  });
//Find  one person which has a certain food in the person's favorites
Person.findOne(
  { favoriteFoods: ["spagetti", "apple"] },
  function (err, person) {
    if (err) {
      console.log("Error finding person:", err);
    } else {
      console.log("Found person:", person);
    }
  }
);
//Search Your Database By _id
//const personId = mongoose.Types.ObjectId("63fa831b5f07264453737251");
Person.findById(personId, function (err, person) {
  if (err) {
    console.log("Error finding person:", err);
  } else {
    console.log("Found person:", person);
  }
});
//const personId = mongoose.Types.ObjectId("63fa831b5f07264453737251");
Person.findById(personId, function (err, person) {
  if (err) {
    console.log("Error finding person:", err);
  } else {
    console.log("Found person:", person);
  }
});
// Classic Updates by Running Find, Edit, then Save

Person.favoriteFoods.push("hamburger");
Person.markModified("favoriteFoods");
person.save(function (err, updatedPerson) {
  if (err) {
    console.log("Error saving person:", err);
  } else {
    console.log("Updated person:", updatedPerson);
  }
});

//Updates on a Document Using model.findOneAndUpdate()
Person.findOneAndUpdate(
  { firstName: "Jane" }, // search query
  { age: 20 }, // update age to 20
  { new: true }, // return updated document
  function (err, updatedPerson) {
    if (err) {
      console.log("Error updating person:", err);
    } else {
      console.log("Updated person:", updatedPerson);
    }
  }
);

// Delete One Document
const personId = mongoose.Types.ObjectId("63fa831b5f07264453737251");

Person.findByIdAndRemove(personId, function (err, deletedPerson) {
  if (err) {
    console.log("Error deleting person:", err);
  } else {
    console.log("Deleted person:", deletedPerson);
  }
});
//Delete Many Documents
Person.deleteMany({ firstName: "Jane" }, function (err, result) {
  if (err) {
    console.log("Error deleting people:", err);
  } else {
    console.log("Number of people deleted:", result.deletedCount);
  }
});
//Chain Search Query Helpers to Narrow Search Results
Person.find({ favoriteFoods: "spagetti" })
  .sort("firstName")
  .limit(2)
  .select("-age")
  .exec(function (err, data) {
    if (err) {
      console.log("Error:", err);
    } else {
      console.log("People who like spagettti:", data);
    }
  });