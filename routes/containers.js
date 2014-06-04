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

  var container_name = req.body.container_name; // Name of container. 
  var description = req.body.container_description;  // Description of the container

  //Container.findOne({ name: container_name }, function(err, doc) {  // This line is case sensitive.
  Container.findOne({ name: { $regex: new RegExp(container_name, "i") } }, function(err, doc) {  // Using RegEx - search is case insensitive
    if(!err && !doc) {
      
      var newContainer = new Container(); 

      newContainer.name = container_name; 
      newContainer.description = description; 
      
      newContainer.save(function(err) {

        if(!err) {
          res.json(201, {message: "Container created with name: " + newContainer.name });    
        } else {
          res.json(500, {message: "Could not create container. Error: " + err});
        }

      });

    } else if(!err) {
      
      // User is trying to create a container with a name that already exists. 
      res.json(403, {message: "Container with that name already exists, please update instead of create or create a new container with a different name."}); 

    } else {
      res.json(500, { message: err});
    } 
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