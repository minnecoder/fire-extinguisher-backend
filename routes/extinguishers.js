const errors = require("restify-errors");
const Extinguisher = require("../models/Extinguisher");

module.exports = server => {
  // Get All extinguishers
  server.get("/extinguishers", async (req, res, next) => {
    try {
      const extinguishers = await Extinguisher.find({});
      res.send(extinguishers);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });

  // Get Single extinguisher
  server.get("/extinguishers/:id", async (req, res, next) => {
    try {
      const extinguisher = await Extinguisher.findById(req.params.id);
      res.send(extinguisher);
      next();
    } catch (err) {
      return next(
        new errors.ResourceNotFoundError(`There is no extinguisher with the id of ${req.params.id}`)
      );
    }
  });

  // Add extinguisher
  server.post(
    "/extinguishers",
    // rjwt({ secret: config.JWT_SECRET }),
    async (req, res, next) => {
      // Check for JSON
      if (!req.is("application/json")) {
        return next(new errors.InvalidContentError("Expects 'application/json'"));
      }

      const { number, location, brand, type, size, six_yr_test, twelve_yr_test, notes } = req.body;

      const extinguisher = new Extinguisher({
        number,
        location,
        brand,
        type,
        size,
        six_yr_test,
        twelve_yr_test,
        notes
      });

      try {
        await extinguisher.save();
        res.send(201);
        next();
      } catch (err) {
        return next(new errors.InternalError(err.message));
      }
    }
  );

  // Update extinguisher
  server.put(
    "/extinguishers/:id",
    // rjwt({ secret: config.JWT_SECRET }),
    async (req, res, next) => {
      // Check for JSON
      if (!req.is("application/json")) {
        return next(new errors.InvalidContentError("Expects 'application/json'"));
      }

      try {
        await Extinguisher.findOneAndUpdate({ _id: req.params.id }, req.body);
        res.send(200);
        next();
      } catch (err) {
        return next(
          new errors.ResourceNotFoundError(
            `There is no extinguisher with the id of ${req.params.id}`
          )
        );
      }
    }
  );

  // Delete extinguisher
  server.del(
    "/extinguishers/:id",
    // rjwt({ secret: config.JWT_SECRET }),
    async (req, res, next) => {
      try {
        await Extinguisher.findOneAndRemove({
          _id: req.params.id
        });
        res.send(204);
        next();
      } catch (err) {
        return next(
          new errors.ResourceNotFoundError(
            `There is no extinguisher with the id of ${req.params.id}`
          )
        );
      }
    }
  );
};
