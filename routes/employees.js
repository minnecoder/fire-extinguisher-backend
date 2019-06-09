const errors = require("restify-errors");
const Employee = require("../models/Employee");

module.exports = server => {
  // Get All Customers
  server.get("/employees", async (req, res, next) => {
    try {
      const employees = await Employee.find({});
      res.send(employees);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });

  // Get Single employee
  server.get("/employees/:id", async (req, res, next) => {
    try {
      const employee = await Employee.findById(req.params.id);
      res.send(employee);
      next();
    } catch (err) {
      return next(
        new errors.ResourceNotFoundError(`There is no employee with the id of ${req.params.id}`)
      );
    }
  });

  // Add employee
  server.post(
    "/employees",
    // rjwt({ secret: config.JWT_SECRET }),
    async (req, res, next) => {
      // Check for JSON
      if (!req.is("application/json")) {
        return next(new errors.InvalidContentError("Expects 'application/json'"));
      }

      const { name, role, address, city, state, zip, phone, email } = req.body;

      const employee = new Employee({
        name,
        role,
        address,
        city,
        state,
        zip,
        phone,
        email
      });

      try {
        await employee.save();
        res.send(201);
        next();
      } catch (err) {
        return next(new errors.InternalError(err.message));
      }
    }
  );

  // Update employee
  server.put(
    "/employees/:id",
    // rjwt({ secret: config.JWT_SECRET }),
    async (req, res, next) => {
      // Check for JSON
      if (!req.is("application/json")) {
        return next(new errors.InvalidContentError("Expects 'application/json'"));
      }

      try {
        await Employee.findOneAndUpdate({ _id: req.params.id }, req.body);
        res.send(200);
        next();
      } catch (err) {
        return next(
          new errors.ResourceNotFoundError(`There is no employee with the id of ${req.params.id}`)
        );
      }
    }
  );

  // Delete employee
  server.del(
    "/employees/:id",
    // rjwt({ secret: config.JWT_SECRET }),
    async (req, res, next) => {
      try {
        await Employee.findOneAndRemove({
          _id: req.params.id
        });
        res.send(204);
        next();
      } catch (err) {
        return next(
          new errors.ResourceNotFoundError(`There is no employee with the id of ${req.params.id}`)
        );
      }
    }
  );
};
