var service = Alloy.Globals.Service;
var facebookId = Alloy.Globals.Facebook.uid;
var publicaciones = Alloy.Globals.Publicaciones;
$.publicaciones.addEventListener("close", function(){
    $.destroy();
});
//*********************** VARIABLES DE CONTROL **************************
var tipos = ["Todas","En Adopción","Perdido","Encontrado","Robado","Maltratado"];
var tiposImgs = Alloy.Globals.ImagenesTipos;

var page = 0;
var quantity = 10;
var recent = false;
var nearest = false;
var elegido = tipos[0];
var kilometers = 10;

$.publicaciones.addEventListener("open",ObtenerPublicaciones);
Ti.API.info("PUBLICACIONES");


function transformarPublicacion(publicacion){
	var copia = publicacion.toJSON();
	Ti.API.info(tiposImgs[copia.tipo-1]);
	var res = {
		titulo:copia.titulo,
		descripcion:copia.descripcion,
		foto:copia.foto,
		tipoImg:tiposImgs[copia.tipo-1],
		id:copia.IdPublicacion
	};
	return res;
}

function ObtenerPublicaciones(){
	if(Ti.Geolocation.locationServicesEnabled){
		if(Ti.Platform.getOsname()=="android"){
			var providerGps = Ti.Geolocation.Android.createLocationProvider({
			    name: Ti.Geolocation.PROVIDER_GPS,
			    minUpdateDistance: 0.0,
			    minUpdateTime: 0
			});
			Ti.Geolocation.Android.addLocationProvider(providerGps);
			Ti.Geolocation.Android.manualMode = true;
		}else{
			Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
			Ti.Geolocation.distanceFilter = 10;
    		Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
		}
		Titanium.Geolocation.getCurrentPosition(function(e){
			if(e.error){
				Ti.UI.createAlertDialog({
					title:"Animales sin Hogar",
					message:"No se pudo obtener la posición actual del usuario"
				}).show();
			}else{
				Obtener(e.coords);
			}
		});
	}else{
		Ti.UI.createAlertDialog({
			title:"Animales sin Hogar",
			message:"No se pudo obtener la posición actual del usuario"
		}).show();
		return;
	}
	function Obtener(coords){
		page++;
		var obj = {
			IdFacebook : facebookId,
			tipo:tipos.indexOf(elegido),
			masCerca:nearest,
			recientes:recent,
			ubicacion_actual_x:coords.longitude,
			ubicacion_actual_y:coords.latitude,
			kilometrosCerca:kilometers,
			pagina:page,
			cantidadElementos:quantity
		};
		var postData = {
			Accion:"VerPublicaciones",
			Data:JSON.stringify(obj),
			Correcto:function(d){
				_.each(d,function(elem){
					//TODO: esto es provisorio
					elem.foto = Titanium.Utils.base64decode(elem.foto.split(",")[1]);
					elem.autor = elem.autor.IdFacebook;
					
					var model = Alloy.createModel("Publicacion",elem);
					//Alloy.Collections.Publicacion.add(elem);
					$.coleccionPublicaciones.add(elem);
				});
				if(d.length<quantity){
					
				}else{
					//var lastElem = $.listaPublicaciones.getSections()[0].getItems().length - 1;
					var lastElem = $.coleccionPublicaciones.length - 1;
					$.listaPublicaciones.setMarker({
						itemIndex : lastElem,
						sectionIndex:0
					});
					Ti.API.info("EL MARCADOR FUE PUESTO EN EL LUGAR: "+lastElem);	
				}
			},
			Error:function(e){
				Ti.UI.createAlertDialog({
					title:"Publicaciones",
					message:"Ocurió un error al obtener las publicaciones!"
				}).show();
			}
		};
		service.Ejecutar(postData);
	}
}


function VerPublicacion(evt){
	var id = parseInt(evt.itemId);
	var pubs = $.coleccionPublicaciones.toJSON();
	var p = _.where(pubs,{IdPublicacion:id})[0];
	//TODO: IR AL CONTROLADOR DE LA PUBLICACION
	Alloy.createController("publicacion",{
		"Publicacion":p
	}).getView().open();
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

function Atras(){
	$.publicaciones.close();
}

function verPublicaciones(){
	Menu();
}

function sobreASH(){
	Alloy.createController("sobreASH").getView().open();
}

function verMapa(){
	Alloy.createController("mapa").getView().open();
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
