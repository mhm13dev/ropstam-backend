// Collection Names Constants
const collections = {
  USERS: "users",
  CATEGORIES: "categories",
};

// Create Collections in DB
function setupCollections(db) {
  // Users Collection
  const users = db.collection(collections.USERS);
  users.createIndex("email", { unique: true });

  const categories = db.collection(collections.CATEGORIES);
  categories.createIndex("name", { unique: true });
}

module.exports = {
  setupCollections,
  collections,
};
