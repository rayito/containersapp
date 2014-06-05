var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var containerSchema = new Schema({
    // containerID   : { type: Number, required: true, trim: true, index: { unique: true } }
    flevel	   	  : { type: Number, required: true, default: 0, min: 0, max: 100 }	// Filling level in %
  , location	  : {
  		lng : { type: Number, required: true } ,
  		lat : { type: Number, required: true }
  } 
});

var container = mongoose.model('container', containerSchema);

module.exports = {
  Container: container
};