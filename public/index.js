/* Current host */
var host = "mongodb://heroku_app26231690:ms47909i4bu18a801t0me72ej7@ds027908.mongolab.com:27908/heroku_app26231690/";
var containers = [];
var markers = [];
var map;

var infowindow = new google.maps.InfoWindow({
  content: ""
});

start();

function start() {

  var call = "containers";
  var url = host + call;

  $.ajax({
    url: url,
    success: function(data){
      generate(data.containers);
    }
  });
}; 


/* Creates a new map and populates it with the containers.  */
/* They come as parameters in a collection from the DB.     */
function generate (coll) {    
  var conts = coll;

  if (conts.length > 0) {   // If there is at least one container

    createNewMap(conts[0].location.lat, conts[0].location.lng);

    for (var i =  0; i < conts.length; i++) {
      var c = conts[i];
      var id = c._id;
      var lat = c.location.lat;
      var lng = c.location.lng;
      var level = c.flevel;

      var icon = getIcon(level);
      var content = getContent(id, lat, lng, level, icon);

      var marker = createNewMarker(lat, lng, icon);

      createNewListener(marker, content);

      containers.push(c);
      markers.push(marker);

    };
  } else {      // If the collection is empty, the map will be centered in Granada
    createNewMap(37.174758, -3.607410);
  }
};

/* Creates a new GMaps map centered in coords [lat, lng]  */
function createNewMap (lat, lng) {

  map = new GMaps({
    el: '#map',
    lat: lat,
    lng: lng,
  });
};


/* Creates a new GMaps marker in locat [lat, lng] with the proper icon.   */
function createNewMarker (lat, lng, icon) {

  var m = map.addMarker({
    lat: lat,
    lng: lng,
    icon: icon
  });

  return m;
};


/* Creates a new event listener for the provided GMaps marker.        */
/* OnClick it will show an InfoWindow with the provided html content. */
function createNewListener (marker, content) {
  var m = marker;
  var c = content;
  google.maps.event.addListener(m, 'click', function() {
    infowindow.content = c;
    infowindow.open(map, m);
  });
};

/* Returns the proper icon:         */
/* 0% - 30% ---> Green container    */
/* 30% - 70% --> Yellow container   */
/* 70% - 100% -> Red container      */
function getIcon (level)  {   
  var l = level;              

  if (l < 30) {
    return './images/green_cont.png';

  } else if (l < 70) {
    return './images/yellow_cont.png';

  } else {
    return './images/red_cont.png';
  };
};

/* Returns the html content for the GMaps InfoWindow   */
function getContent(id, lat, lng, level, icon) {
  var c = '<div class="w"><h4 class="wparaf"><span class="casered">containers</span><span class="casegreen">app</span></h4>' +
          '<p class="wparaf"><span class="b">Container: </span>' + id + '</p>' +
          '<p class="wparaf"><span class="b">Location: </span>' + lat + '°, ' + lng + '°</p>' +
          '<div class="filling"><span class="b">Filling level: </span>' + level + '%</div>' + 
          '<div class="pic"><span><img class=bottom src="' + icon + '"></span></div></div>';

  return c;
}


