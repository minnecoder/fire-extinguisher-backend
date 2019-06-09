const errors = require("restify-errors");
const Site = require("../models/Site");

module.exports = server => {
  // Get All sites
  server.get("/sites", async (req, res, next) => {
    try {
      const sites = await Site.find({});
      res.send(sites);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });

  // Get Single site
  server.get("/sites/:id", async (req, res, next) => {
    try {
      const site = await Site.findById(req.params.id);
      res.send(site);
      next();
    } catch (err) {
      return next(
        new errors.ResourceNotFoundError(`There is no site with the id of ${req.params.id}`)
      );
    }
  });

  // Add site
  server.post(
    "/sites",
    // rjwt({ secret: config.JWT_SECRET }),
    async (req, res, next) => {
      // Check for JSON
      if (!req.is("application/json")) {
        return next(new errors.InvalidContentError("Expects 'application/json'"));
      }

      const {
        name,
        address,
        city,
        state,
        zip,
        number_extinguishers,
        contact_name,
        contact_phone
      } = req.body;

      const site = new Site({
        name,
        address,
        city,
        state,
        zip,
        number_extinguishers,
        contact_name,
        contact_phone
      });

      try {
        await site.save();
        res.send(201);
        next();
      } catch (err) {
        return next(new errors.InternalError(err.message));
      }
    }
  );

  // Update site
  server.put(
    "/sites/:id",
    // rjwt({ secret: config.JWT_SECRET }),
    async (req, res, next) => {
      // Check for JSON
      if (!req.is("application/json")) {
        return next(new errors.InvalidContentError("Expects 'application/json'"));
      }

      try {
        await Site.findOneAndUpdate({ _id: req.params.id }, req.body);
        res.send(200);
        next();
      } catch (err) {
        return next(
          new errors.ResourceNotFoundError(`There is no site with the id of ${req.params.id}`)
        );
      }
    }
  );

  // Delete site
  server.del(
    "/sites/:id",
    // rjwt({ secret: config.JWT_SECRET }),
    async (req, res, next) => {
      try {
        await Site.findOneAndRemove({
          _id: req.params.id
        });
        res.send(204);
        next();
      } catch (err) {
        return next(
          new errors.ResourceNotFoundError(`There is no site with the id of ${req.params.id}`)
        );
      }
    }
  );
};
