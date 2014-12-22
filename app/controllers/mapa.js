var args = arguments[0] || {};

var imagenTipo = Alloy.Globals.ImagenesTipos;
var delta = 0.01;
var centro = {latitud:0,longitud:0}; 
var yaCargado = false; 
var enCambio = false;
var tipoDePublicacion = 0;

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
		kilometrosCerca:1,
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
			Ti.API.info("VINIERON LAS PUBLICACIONES!!");
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

function MapPublicacionAnnotation(publicaciones){
	var listOfAnnotations = _.map(publicaciones,function(publicacion){
		var img = Alloy.Globals.MapaImagenesTipos[publicacion.tipo];
		var annotationData = {
			image: img,
			latitude:publicacion.ubicacion_X,
			longitude:publicacion.ubicacion_Y,
			subtitle:publicacion.descripcion,
			title:publicacion.titulo
		};
		Ti.API.info(JSON.stringify(annotationData));
		var annotation = Alloy.Globals.Map.createAnnotation(annotationData);
		return annotation;
	}); 
	return listOfAnnotations;
}

function CargarMapa(centro,listaPublicaciones){
	if(!yaCargado){
		$.mapview.region = {
			latitude:centro.latitud,
			latitudeDelta:delta,
			longitude:centro.longitud,
			longitudeDelta:delta
		};	
	}
	$.mapview.addAnnotations(MapPublicacionAnnotation(listaPublicaciones));
}

function SeMovio(evt){
	if(!enCambio){
		enCambio = true;
		centro.latitud = evt.latitude;
		centro.longitud = evt.longitude;
		BuscarPublicaciones(0);
	}
}

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
		BuscarPublicaciones(0);
		yaCargado = true;
	});
	
}else{
	Ti.UI.createAlertDialog({
		title:"Mapa",
		message:"Los servicios de localización se encuentran desactivados. Por favor activelos para continuar."
	}).show();
}


var opened = false;
function Menu(){
	if(!opened){
		var animation = Titanium.UI.createAnimation({
			left:200,
			duration: 200
		});
		$.contenedor.animate(animation);
		opened=true;
	}else{
		var animation = Titanium.UI.createAnimation({
			left:0,
			duration: 200
		});
		$.contenedor.animate(animation);
		opened=false;
	}
	return opened;
}

function sobreASH(){
	Alloy.createController("sobreASH").getView().open();
}

function verPublicaciones(){
	Alloy.createController("publicaciones").getView().open();
}

function verMapa(){
	Menu();	
}

function configurar(){
	Alloy.createController("configuracion").getView().open();
}

function donar(){
	Alloy.createController("donaciones").getView().open();
}

function padrinos(){
	Alloy.createController("padrinos").getView().open();
}

function adoptar(){
	Alloy.createController("adopciones").getView().open();
}

function nuevaPublicacion(){
	Alloy.createController("tiposPublicaciones").getView().open();
}

