var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initialize() {
    var latM = -15.1137027;
    var lonM = -51.8961242;
    
    // verifica se o navegador tem suporte a geolocalização
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){ // callback de sucesso
            // ajusta a posição do marker para a localização do usuário
            latM = position.coords.latitude;
            lonM = position.coords.longitude;
        }, 
        function(error){ // callback de erro
           console.log('Erro ao obter localização.', error);
        });
    } else {
        console.log('Navegador não suporta Geolocalização!');
    }  
  
  var bounds = new google.maps.LatLngBounds();
  directionsDisplay = new google.maps.Geocoder();
  var saopaulo = new google.maps.LatLng(latM, lonM);
  var mapOptions = {
    zoom: 5,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: saopaulo
  }
  map = new google.maps.Map(document.getElementById('mapa'), mapOptions);
  //directionsDisplay.setMap(map);
  
  
    function mark_ok(markers){
        // Info Window Content
        $.ajax({
              type: 'GET',
              dataType: 'json',
              url: 'http://2ilabs.com.br/globoideias/ws/consulta-desc.php',
              success: function(data){
                info_ok(markers,data);
              },
              error: function(xhr, type){
                  alert("Ocorreu um erro, tente novamente mais tarde."+xhr+" "+type);
              }
            });    
    }  
    
    function info_ok(markers, infoWindowContent){
        // Display multiple markers on a map
        var infoWindow = new google.maps.InfoWindow(), marker, i;

        // Loop through our array of markers & place each one on the map  
        for( i = 0; i < markers.length; i++  ) {
            var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
            bounds.extend(position);
            marker = new google.maps.Marker({
                position: position,
                map: map,
                icon: "img/icon.png",
                title: markers[i][0],
                scaledSize: new google.maps.Size(20, 20)
            });

            // Allow each marker to have an info window    
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infoWindow.setContent(infoWindowContent[i][0]);
                    infoWindow.open(map, marker);
                }
            })(marker, i));
        }
    }
  
    $.ajax({
          type: 'GET',
          dataType: 'json',
          url: 'http://2ilabs.com.br/globoideias/ws/consulta.php',
          success: function(data){
            mark_ok(data);
          },
          error: function(xhr, type){
              alert("Ocorreu um erro, tente novamente mais tarde."+xhr+" "+type);
          }
    });
        
}
   

google.maps.event.addDomListener(window, 'load', initialize);
