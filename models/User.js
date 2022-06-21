const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

  hashPassword(password) {
    return bcrypt.hashSync(password, 12);
  }

  static generatePassword() {
    return crypto.randomBytes(16).toString("hex");
  }

  static async comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }

  static signJWT(userId) {
    return jwt.sign({ sub: userId.toString() }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN_DAYS + "d",
    });
  }
}

module.exports = User;
