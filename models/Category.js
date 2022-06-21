const { ObjectId } = require("mongodb");

class Category {
  constructor(name) {
    const creationDate = new Date();
    this._id = new ObjectId();
    this.name = name;
    this.createdAt = creationDate;
    this.updatedAt = creationDate;
  }
}

module.exports = Category;
