const { ObjectId } = require("mongodb");

class Car {
  constructor(model, make, color, reg_num, category_id) {
    const creationDate = new Date();
    this._id = new ObjectId();
    this.model = model;
    this.make = make;
    this.color = color;
    this.reg_num = reg_num;
    this.category_id = category_id;
    this.createdAt = creationDate;
    this.updatedAt = creationDate;
  }
}

module.exports = Car;
