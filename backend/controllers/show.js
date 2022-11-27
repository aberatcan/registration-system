const Show = require("../models/show");

exports.getShowController = (req, res) => {
    Show.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving shows."
          });
        else res.send(data);
      });
};

exports.createShowController = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a Customer
      const show = new Show({
        name: req.body.name,
        score: req.body.score
      });
    
      // Save Customer in the database
      Show.create(show, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Show."
          });
        else res.send(data);
      });
};

exports.updateShowController = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      Show.update(
        req.body.name,
        new Show(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Show with name ${req.body.name}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating Show with name " + req.body.name
              });
            }
          } else res.send(data);
        }
      );
};

exports.deleteShowController = (req, res) => {
    Show.remove(req.body.name, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.send({
              message: `Not found Show with name ${req.body.name}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Show with name " + req.body.name
            });
          }
        } else res.send({ message: `Show was deleted successfully!` });
      });
};