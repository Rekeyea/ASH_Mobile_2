
var args = arguments[0] || {};

var unaPublicacion = args["unica"] || false;
var miPublicacion = args["Publicacion"] || null;

var imagenTipo = Alloy.Globals.ImagenesTipos;
var delta = 0.01;
var centro = {latitud:0,longitud:0}; 
var yaCargado = false; 
var enCambio = false;
var tipoDePublicacion = 0;
var kilometrosCerca = 1;

$.mapa.addEventListener("close", function(){
    $.destroy();
});

$.mapa.addEventListener("pinchangedragstate",function(evt){
	
});

$.mapview.addEventListener("regionchanged",SeMovio);


function BuscarPublicaciones(tipo){
	var postData = {
		IdFacebook : Alloy.Globals.Facebook.uid,
		tipo:tipo,
		masCerca:true,
		recientes:false,
		ubicacion_actual_x:centro.latitud,
		ubicacion_actual_y:centro.longitud,
		kilometrosCerca:kilometrosCerca,
		pagina:1,
		cantidadElementos:100
	};
	Ti.API.info(JSON.stringify(postData));
	postData = JSON.stringify(postData);
	//primero pongo el nuevo centro
	Alloy.Globals.Service.Ejecutar({
		"Accion":"VerPublicaciones",
		"Data":postData,
		"Correcto":function(data){
			//Obtengo las publicaciones
			CargarMapa(centro,data);
			enCambio = false;
		},
		"Error":function(err){
			Ti.UI.createAlertDialog({
				title:"Error al Mostrar",
				message:"No se pudieron obtener las ubicaciones de las publicaciones"
			}).show();
		}
	});	
}

function IrAPublicacion(evt){
	Alloy.Globals.AbrirVentana("publicacion",{
		"Publicacion":evt.annotation.publicacion
	});
}

function MapPublicacionAnnotation(publicaciones){
	var listOfAnnotations = _.map(publicaciones,function(publicacion){
		var img = Alloy.Globals.MapaImagenesTipos[publicacion.tipo];
		var annotationData = {
			image: img,
			latitude:publicacion.ubicacion_X,
			longitude:publicacion.ubicacion_Y,
			subtitle:publicacion.descripcion,
			title:publicacion.titulo,
			publicacion:publicacion
		};
		var annotation = Alloy.Globals.Map.createAnnotation(annotationData);
		return annotation;
	}); 
	return listOfAnnotations;
}

function CargarMapa(centro,listaPublicaciones){
	//$.mapview.hide();
	//$.mapview.show();	
	$.mapview.addAnnotations(MapPublicacionAnnotation(listaPublicaciones));
}

function SeMovio(evt){
	if(!unaPublicacion){
		if(!enCambio){
			enCambio = true;
			kilometrosCerca = parseInt(DecimalDegreeToKilometer(evt.latitudeDelta));
			centro.latitud = evt.latitude;
			centro.longitud = evt.longitude;
			//tengo que calcular la distancia para pedir las publicaciones
			BuscarPublicaciones(0);
		}	
	}
}

function DecimalDegreeToKilometer(deltaLat){
    //formula sacada de: http://en.wikipedia.org/wiki/Haversine_formula
 	var RadioDeLaTierra = 6356750;//en metros   
    var res = deltaLat * (Math.PI/180) * RadioDeLaTierra;
    res = res/1000;
    Ti.API.info("LA DISTANCIA ES: "+res+" KM");
    return res;
}

//funcion encargada de mostrar la publicacion elegida en el mapa
function CargarPublicacion(publicacion){
	Ti.API.info(JSON.stringify(centro));
	CargarMapa(centro,[publicacion]);
} 

$.mapa.addEventListener("open",function(){
	//obtengo mi ubicacion actual y centro el mapa en ella. A partir de ahi coloco las annotations
	if(Ti.Geolocation.locationServicesEnabled){
		if(Titanium.Platform.getOsname()=="android"){
			var providerGps = Ti.Geolocation.Android.createLocationProvider({
			    name: Ti.Geolocation.PROVIDER_GPS,
			    minUpdateDistance: 0.0,
			    minUpdateTime: 0
			});
			Ti.Geolocation.Android.addLocationProvider(providerGps);
			Ti.Geolocation.Android.manualMode = true;
		}else{
			Ti.Geolocation.purpose = "Obtener la ubicación actual para mostrar las publicaciones.";
			Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
			Ti.Geolocation.distanceFilter = 10;
			Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;	
		}
		Titanium.Geolocation.getCurrentPosition(function(evt){
			try{
				centro.latitud = evt.coords.latitude;
				centro.longitud = evt.coords.longitude;	
			}catch(ex){
				Ti.API.error(ex);
			}
			Ti.API.info("****************** EL CENTRO ES **********************");
			Ti.API.info(JSON.stringify(centro));
			Ti.API.info(JSON.stringify(evt));
			if(unaPublicacion){
				centro.latitud = miPublicacion.ubicacion_X;
				centro.longitud = miPublicacion.ubicacion_Y;
				Ti.API.info("#### CARGO UNA SOLA PUBLICACION ###");
				CargarPublicacion(miPublicacion);
			}else{
				BuscarPublicaciones(0);	
			}
			$.mapview.setLocation({
				latitude:centro.latitud,
				latitudeDelta:delta,
				longitude:centro.longitud,
				longitudeDelta:delta
			});
			yaCargado = true;
		});
		
	}else{
		Ti.UI.createAlertDialog({
			title:"Mapa",
			message:"Los servicios de localización se encuentran desactivados. Por favor activelos para continuar."
		}).show();
	}
});