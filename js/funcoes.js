$(document).ready(function(e){
    $("#bt-cad").click(function(e){   
        $.ajax({
          type: 'POST',
          url: 'http://2ilabs.com.br/globoideias/ws/cadastro.php',
          data: $("#form-cadastro").serialize(),
          success: function(data){
            if(data == "true"){
                alert("Sua ideia foi enviada com sucesso!");
                location.href = "index.html";
            } else {
                alert("Ocorreu um erro, tente novamente mais tarde.");
            }
          },
          error: function(xhr, type){
              alert("Ocorreu um erro, tente novamente mais tarde.");
          }
        });        
    });
    
    $("#local").change(function(e){
           var address = $("#local").val();
           directionsDisplay = new google.maps.Geocoder();
           directionsDisplay.geocode( { 'address': address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                   $("#latlon").val(results[0].geometry.location); 
                }
           });
       });
});

