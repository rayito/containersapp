var Container = require('../models/container').Container; 

/*
 * Containers Routes
 */
exports.index = function(req, res) {
  Container.find({}, function(err, docs) {
    if(!err) {
      res.json(200, { containers: docs });  
    } else {
      res.json(500, { message: err });
    }
  });
}

exports.show = function(req, res) {
  
  var id = req.params.id; // The id of the container the user wants to look up. 
  Container.findById(id, function(err, doc) {
    if(!err && doc) {
      res.json(200, doc);
    } else if(err) {
      res.json(500, { message: "Error loading container. " + err});
    } else {
      res.json(404, { message: "Container not found."});
    }
  });
}

exports.create = function(req, res) {

  var lng = req.body.lng;         // Longitude of the container location. 
  var lat = req.body.lat;         // Latitude of the container location.
  var flevel = req.body.flevel;   // Filling level in %
    
  var newContainer = new Container(); 

    newContainer.location.lng = lng; 
    newContainer.location.lat = lat;
    newContainer.location.flevel = flevel;
    
    newContainer.save(function(err) {

      if(!err) {
        res.json(201, {message: "Container created with id " + newContainer._id + " and location " newContainer.location });    
      } else {
        res.json(500, {message: "Could not create container. Error: " + err});
      }

    });
  });

}

exports.update = function(req, res) {
  
  var id = req.body.id; 
  var container_name = req.body.container_name;
  var container_description = req.body.container_description; 

  Container.findById(id, function(err, doc) {
      if(!err && doc) {
        doc.name = container_name; 
        doc.description = container_description; 
        doc.save(function(err) {
          if(!err) {
            res.json(200, {message: "Container updated: " + container_name});    
          } else {
            res.json(500, {message: "Could not update container. " + err});
          }  
        });
      } else if(!err) {
        res.json(404, { message: "Could not find container."});
      } else {
        res.json(500, { message: "Could not update container. " + err});
      }
    }); 
}

exports.delete = function(req, res) {

  var id = req.body.id; 
  Container.findById(id, function(err, doc) {
    if(!err && doc) {
      doc.remove();
      res.json(200, { message: "Container removed."});
    } else if(!err) {
      res.json(404, { message: "Could not find container."});
    } else {
      res.json(403, {message: "Could not delete container. " + err });
    }
  });
}