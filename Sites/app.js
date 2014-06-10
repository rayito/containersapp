/********************************************************************/
/* Containers management controller for the app.html view           */
/********************************************************************/

var host = "http://localhost:3000/";


function initialize() {
  
  deleteALL(function(){   // Kill 'em ALL! --> Empties the DB
    // lat & lng of Playmobil Club, Granada (Spain)
    var conts = [[37.174758, -3.607410], 
                [37.178409, -3.609165], 
                [37.176152, -3.604358],
                [37.171886, -3.607985]];

    for (var i = 0; i < conts.length; i++) {
      createContainer(conts[i][0], conts[i][1], 0);
    }   
  });              

};


function showContainer() {
  var id = document.getElementById("id").value;

  if (id == "") {       // If the ID field is empty, just show the full collection
    // res = extract();
    // document.getElementById("db").innerHTML = JSON.stringify(res);
    showCollection();

  } else {
    var call = "show";

    $.ajax({
      url: host + call + "?id=" + id,
      success: function(data){
        var print = printResult(data);
        document.getElementById("res").innerHTML = print;
      }
    });
  }
};


function printResult (data) {
  var id  = data._id;
  var lat = data.location.lat;
  var lng = data.location.lng;
  var lev = data.flevel;

  var s = '<div class="bodyContent">' +
          '<b>Container ' + id + ' </b>' +
          '<p>Location: ' + lat + '°, ' + lng + '°</p>' +
          '<p>Filling level: ' + lev + '%</p></div>';

  console.log(s); 

  return s;
};


function showCollection() {
  var call = "containers";
  var url = host + call;

  $.ajax({
    url: url,
    success: function(data){
      var coll = data.containers;
      console.log("Qué pollas!!");

      document.getElementById("db").innerHTML = "";
      console.log("document.getElementById(db).innerHTML = _ ;");
      
      console.log("coll.length > 0");
      for (var i = 0; i < coll.length; i++) {

        var c = coll[i];
        document.getElementById("db").innerHTML += printResult(c);

      } 
    }
  });
};


function createContainer(_lat, _lng, _level) {
  var lat, lng, level;

  lat = _lat || $('#lat').val();
  lng = _lng || $('#lng').val();
  level = _level || $('#level').val();
  
  var call = "create";
  var url = host + call + "?lat=" + lat + "&lng=" + lng;  

  if (level != "")              // If the filling level is not provided, the url won't include it.
    url += "&level=" + level;   // The DB will set it by default as 0%

  $.ajax({
    url: url,
    success: function(data){
      document.getElementById("res").innerHTML = data.message;
    }
  });

  showCollection();
};


function updateContainer() {
  var id, level;

  id = $('#id').val();
  level = $('#level').val();

  var call = "update";
  var url = host + call + "?id=" + id + "&level=" + level;

  $.ajax({
    url: url,
    success: function(data){
      document.getElementById("res").innerHTML = data.message;
    }
  });

  showCollection();
};


function deleteALL(onremovedCB) {
  var call = "containers";
  var url = host + call;

  $.ajax({
    url: url,
    success: function(data){

      var conts = data.containers;
      
      if (conts.length > 0) {   // If there is at least one container

        for (var i = 0; i < conts.length; i++) {
          var c = conts[i];
          var id = c._id;

          if (i === conts.length - 1) {
            deleteContainer(id, onremovedCB);
          } else {
            deleteContainer(id);
          }
        };

        document.getElementById("res").innerHTML = "All the containers deleted!";
      }
    }
  });
};


function deleteContainer(_id, callback) {
  var id = _id || $('#id').val();
  
  var call = "delete";
  var url = host + call + "?id=" + id;

  $.ajax({
    url: url,
    success: function(data){
      document.getElementById("res").innerHTML = data.message;
      if (typeof callback === "function") {
        callback();
      }
    }
  });

  showCollection();
};

