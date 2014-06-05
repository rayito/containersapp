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
  
  var cID = req.query.id; // The id of the container the user wants to look up. 
  Container.findById(cID, function(err, doc) {
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

  //var id = req.query.id;
  var lat = req.query.lat;         // Latitude of the container location.
  var lng = req.query.lng;         // Longitude of the container location. 
  var flevel = req.query.level;    // Filling level in %
    
  var newContainer = new Container(); 

  if(!(lat === undefined || lng === undefined)) {
    newContainer.location.lat = lat;
    newContainer.location.lng = lng;

    if(!(flevel === undefined)) newContainer.flevel = flevel;
    
    newContainer.save(function(err) {
      if(!err) {
        res.json(201, {message: "Container created with ID " + newContainer._id + 
                                ", filling level of " + newContainer.flevel + 
                                "% and location [ Latitude: " + newContainer.location.lat + 
                                "° , Longitude: " + newContainer.location.lng + "° ]" });    
      } else {
        res.json(500, {message: "Could not create container. Error: " + err});
      }

      });    
  } else {
    res.json(400, {message: "Could not create container. Correct location missing."})
  }
}

exports.update = function(req, res) {
  
  var cID = req.query.id;           // Container ID (field _id in the DB)
  var newFlevel = req.query.level;  // New filling level in %

  Container.findById(cID, function(err, doc) {
      if(!err && doc) {

        if(doc.flevel.toString() != newFlevel) {

          var oldFlevel = doc.flevel;
          doc.flevel = newFlevel; 
          doc.save(function(err) {
            if(!err) {
              res.json(200, {message: "Filling level of container with ID " + doc._id + 
                                      " updated. BEFORE: " + oldFlevel + "% | NOW: " + doc.flevel + "%" });    
            } else {
              res.json(500, {message: "Could not update container. " + err});
            }  
          });
        } else {  // New filling level is the same --> no need to access the DB
          res.json(202, { message: "Filling level is already " + doc.flevel + "%. Container didn't change."});
        }
      } else if(!err) {
        res.json(404, { message: "Could not find container."});
      } else {
        res.json(500, { message: "Could not update container. " + err});
      }
    }); 
}

exports.delete = function(req, res) {

  var cID = req.query.id; 
  Container.findById(cID, function(err, doc) {
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