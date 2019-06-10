const errors = require("restify-errors");
const Site = require("../models/Site");
const Extinguisher = require("../models/Extinguisher");

module.exports = server => {
  // Get Site Report for single site
  server.get("/site-report/:id", async (req, res, next) => {
    try {
      const data = [];
      const site = await Site.findOne({ site_id: req.params.id });
      data.push(site);
      const extinguishers = await Extinguisher.find({ site_id: req.params.id });
      data.push(extinguishers);
      res.send(data);

      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });
};
