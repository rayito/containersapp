/********************************************************************/
/* Interface that connects index.html with the Node.js web service  */
/********************************************************************/


/* Current host */
var host = "http://localhost:3000/";

/* Returns the information of a designated container */
function show(id) {

  var call = "show";
  var res;
  $.ajax({
    url: host + call + "?id=" + id,
    context: document,
    success: function(data){
      //$('#res').html(JSON.stringify(data));
      res = data;
    }
  });

  return res;

};

/* Creates a new container with the provided information */
function create (lat, lng, level) {

  var call = "create";
  var url = host + call + "?lat=" + lat + "&lng=" + lng;  

  if (level != "")              // If the filling level is not provided, the url won't include it.
    url += "&level=" + level;   // The DB will set it by default as 0%

  $.ajax({
    url: url,
    success: function(data){
      return data;
    }
  });

};

/* Returns the complete collection of containers */
function extract () {
  
  var call = "containers";
  var url = host + call;

  $.ajax({
    url: url,
    success: function(data){
      return data;
    }
  });

};

/* Updates a container with a new filling level */
function update (id, level) {

  var call = "update";
  var url = host + call + "?id=" + id + "&level=" + level;

  $.ajax({
    url: url,
    success: function(data){
      return data;
    }
  });

};

/* Deletes the provided container from the DB   */
function del (id) {

  var call = "delete";
  var url = host + call + "?id=" + id;

  $.ajax({
    url: url,
    success: function(data){
      return data;
    }
  });
}



