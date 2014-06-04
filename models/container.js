var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var containerSchema = new Schema({
    containerID   : { type: Number, required: true, trim: true, index: { unique: true } }
  , flevel	   	  : { type: Number, required: true, default: 0 }
  , lat  		  : { type: Number, required: true }
  , lng			  : { type: Number, required: true }
});

var container = mongoose.model('container', containerSchema);

module.exports = {
  Container: container
};