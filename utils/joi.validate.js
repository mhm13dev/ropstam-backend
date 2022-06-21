// A Middleware for Validating Data in Request
exports.joiValidate = (_schema, property, options = {}) => {
  return (req, res, next) => {
    const schema = typeof _schema === "string" ? req[_schema] : _schema;

    const { error, value } = schema.validate(req[property], {
      errors: { wrap: { label: "", array: "" } },
      ...options,
    });

    const valid = error == null;
    if (valid) {
      req.joiValue = value;
      next();
    } else {
      req.joiError = error;
      next();
    }
  };
};
