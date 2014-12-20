var args = arguments[0] || {};

var centro; 
var pubsAMostrar; 

/*
centro = args["centro"];//es una latitud y longitud
pubsAMostrar = args["publicaciones"];
*/

//TODO: sacar esto que es para propocito de testing
centro = {
	latitud:-34.9081,
	longitud:-56.1987
};

pubsAMostrar = [
	{
		tipo:1,
		ubicacion_X:-34.9080,
		ubicacion_Y:-56.2000,
		descripcion:"Una descripción para el cosito",
		titulo: "Una Publicacion"
	}
];

var imagenTipo = Alloy.Globals.ImagenesTipos;
var delta = 0.01;

CargarMapa(centro,pubsAMostrar);

function BuscarPublicaciones(params){
	
}

function MapPublicacionAnnotation(publicaciones){
	var listOfAnnotations = _.map(pubsAMostrar,function(publicacion){
		var imgArr = imagenTipo[publicacion.tipo].split(".");
		var img = imgArr[0]+"-min."+imgArr[1]; 
		Ti.API.info(img);
		var annotation = Alloy.Globals.Map.createAnnotation({
			image: img,
			latitude:publicacion.ubicacion_X,
			longitude:publicacion.ubicacion_Y,
			subtitle:publicacion.descripcion,
			title:publicacion.titulo
		});
		return annotation;
	}); 
	return listOfAnnotations;
}

function CargarMapa(centro,listaPublicaciones){
	$.mapview.region = {
		latitude:centro.latitud,
		latitudeDelta:delta,
		longitude:centro.longitud,
		longitudeDelta:delta
	};
	$.mapview.addAnnotations(MapPublicacionAnnotation(listaPublicaciones));
}

function SeMovio(evt){
	//primero pongo el nuevo centro
	centro.latitud = evt.latitude;
	centro.longitud = evt.longitude;
	Alloy.Globals.Service.Ejecutar({
		"Accion":"VerPublicaciones",
		"Data":{
			IdFacebook : Alloy.Globals.Facebook.uid,
			tipo:0,
			masCerca:true,
			recientes:true,
			ubicacion_actual_x:centro.latitud,
			ubicacion_actual_y:centro.longitud,
			kilometrosCerca:1,
			pagina:1,
			cantidadElementos:10
		},
		"Correcto":function(data){
			//Obtengo las publicaciones
			Ti.API.info("VINIERON LAS PUBLICACIONES!!");
			CargarMapa(centro,data);
		},
		"Error":function(err){
			Ti.UI.createAlertDialog({
				title:"Error al Mostrar",
				message:"No se pudieron obtener las ubicaciones de las publicaciones"
			}).show();
		}
	});
}

//$.mapview.addEventListener("regionchanged",SeMovio);

/*//obtengo mi ubicacion actual y centro el mapa en ella. A partir de ahi coloco las annotations
if(Ti.Geolocation.locationServicesEnabled){
	//TODO: Este codigo a continuacion funciona solo para android. Hay que modularizarlo mejor de modo de 
	//que cuando se pase a iPhone sea facil de hacer
	var provider = Ti.Geolocation.Android.createLocationProvider({
		name:Ti.Geolocation.PROVIDER_GPS,
		minUpdateDistance:0.0,
		minUpdateDistance:0
	});
}else{
	Ti.UI.createAlertDialog({
		title:"Mapa",
		message:"Los servicios de localización se encuentran desactivados. Por favor activelos para continuar."
	}).show();
}*/
