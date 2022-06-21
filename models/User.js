const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

// User class for constructing new user object
class User {
  constructor(email, password) {
    const creationDate = new Date();
    this._id = new ObjectId();
    this.email = email;
    this.password = this.hashPassword(password);
    this.createdAt = creationDate;
    this.updatedAt = creationDate;
  }

  static generatePassword() {
    return crypto.randomBytes(16).toString("hex");
  }

  hashPassword(password) {
    return bcrypt.hashSync(password, 12);
  }
}

module.exports = User;
