var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var containerSchema = new Schema({

//	/* container ID: ID provided by the user. If missing, internal _id will be used.	*/
	/* flevel: Filling level of the container in %. 									*/
	/* location: contains the longitude and latitude of the container.					*/
    // containerID   : { type: String, required: true, default: containerSchema._id.toString(), trim: true, index: { unique: true }} 
   flevel	   	  : { type: Number, default: 0, min: 0, max: 100 }	// Filling level in %
  , location	  : {
  		lat : { type: Number, required: true, min: -90, max: 90 } ,
  		lng : { type: Number, required: true, min: -90, max: 90 }
  } 
});

var container = mongoose.model('container', containerSchema);

module.exports = {
  Container: container
};