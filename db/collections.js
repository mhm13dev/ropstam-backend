// Collection Names Constants
const collections = {
  USERS: "users",
};

// Create Collections in DB
function setupCollections(db) {
  // Users Collection
  const users = db.collection(collections.USERS);
  users.createIndex("email", { unique: true });
}

module.exports = {
  setupCollections,
  collections,
};
