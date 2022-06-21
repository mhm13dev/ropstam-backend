// Collection Names Constants
const collections = {
  USERS: "users",
  CATEGORIES: "categories",
  CARS: "cars",
};

// Create Collections in DB
function setupCollections(db) {
  // Users Collection
  const users = db.collection(collections.USERS);
  users.createIndex("email", { unique: true });

  // Categories Collection
  const categories = db.collection(collections.CATEGORIES);
  categories.createIndex("name", { unique: true });

  // Cars Collection
  const cars = db.collection(collections.CARS);
  cars.createIndex("reg_num", { unique: true });
}

module.exports = {
  setupCollections,
  collections,
};
