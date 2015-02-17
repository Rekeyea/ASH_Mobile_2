var args = arguments[0] || {};

$.configuracion.addEventListener("close", function(){
    $.destroy();
});

var obj = Ti.App.Properties.getObject("DatosUsuario");
var uid = Alloy.Globals.Facebook.uid;
var nombre = obj.Nombre || "";
var mail = obj.Mail || "";
var tel = obj.Telefono || "";
var notifs = obj.Notificaciones || false;

$.configuracionModel.set({
	"UID":uid,
	"Nombre":nombre,
	"Mail":mail,
	"Telefono":tel,
	"Notificaciones":notifs
});

function Atras(){
	$.configuracion.close();
}

function Grabar(){
	var servicio = Alloy.Globals.Service;
	var objUsuario = {
		"IdFacebook":$.configuracionModel.get("UID"),
		"nombre":$.configuracionModel.get("Nombre"),
		"mail":$.configuracionModel.get("Mail"),
		"telefono":$.configuracionModel.get("Telefono"),
	};
	var objNoti = {
		"IdFacebook":$.configuracionModel.get("UID"),
		"notificar":$.configuracionModel.get("Notificaciones") == 1 ? true : false
	};
	var guardado = false;
	servicio.Ejecutar({
		"Accion":"ActualizarDatos",
		"Data":JSON.stringify(objUsuario),
		"Correcto":function(d){
			if(!guardado){
				guardado = true;
			}else{
				Ti.UI.createAlertDialog({
					title:"Actualizar Datos",
					message:"Los datos fueron actualizados correctamente."
				}).show();
			}
		},
		"Error":function(e){
			Ti.UI.createAlertDialog({
				title:"Actualizar Datos",
				message:"Ocurrio un error al actualizar los datos."
			}).show();
		}
	});
	servicio.Ejecutar({
		"Accion":"ConfigurarNotificaciones",
		"Data":JSON.stringify(objNoti),
		"Correcto":function(d){
			if(!guardado){
				guardado = true;
			}else{
				Ti.UI.createAlertDialog({
					title:"Actualizar Datos",
					message:"Los datos fueron actualizados correctamente."
				}).show();
			}
		},
		"Error":function(e){
			Ti.UI.createAlertDialog({
				title:"Configurar Notificaciones" ,
				message:"Ocurrio un error al configurar las notificaciones."
			}).show();
		}
	});
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
	Alloy.createController("mapa").getView().open();
}

function configurar(){
	Menu();
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

function CambiarInformacion(){
	$.configuracionModel.set({"Nombre":$.nombre.value});
	$.configuracionModel.set({"Mail":$.mail.value});
	$.configuracionModel.set({"Telefono":$.telefono.value});
	$.configuracionModel.set({"Notificaciones":$.switchConf.value});
	var model = $.configuracionModel.toJSON();
	Ti.API.info("******** MODELO ***********");
	Ti.API.info(JSON.stringify(model));
	Ti.App.Properties.setObject("DatosUsuario",model);
	configurarNotificaciones(model);
	actualizarDatos(model);
	Grabar();
}


function configurarNotificaciones(model){
	var not = true;
	if($.switchConf.value == 0){
		not = false;
	}
	var params = {
		IdFacebook: model.UID,
		notificar: not,
    };
	var message = JSON.stringify(params);
	
	var obj = {
		Accion:"ConfigurarNotificaciones",
		Data:message,
		Correcto:function(data){
			Ti.API.info("se configuraron las notificaciones");
		},
		Error: function(evt){
			Ti.UI.createAlertDialog({
				title:"Configurar Notificaciones",
				message:"No ha sido posible configurar las notificaciones."
			}).show();
		}
	};
	Ti.API.info("********************* OBJETO ********************");
	Ti.API.info(JSON.stringify(obj));
	Alloy.Globals.Service.Ejecutar(obj);
}

function actualizarDatos(model){
	var params = {
		IdFacebook: model.UID,
		mail: $.mail.value,
		nombre: $.nombre.value,
		telefono: $.telefono.value,
    };
	var message = JSON.stringify(params);
	var obj = {
		Accion:"ActualizarDatos",
		Data:message,
		Correcto:function(data){
			Ti.API.info("Se actualizaron los datos");
		},
		Error: function(evt){
			Ti.UI.createAlertDialog({
				title:"Actualizar Datos",
				message:"No ha sido posible actualizar los datos."
			}).show();
		}
	};
	Ti.API.info("********************* OBJETO ********************");
	Ti.API.info(JSON.stringify(obj));
	Alloy.Globals.Service.Ejecutar(obj);
}

function CerrarSesion(){
	Alloy.Globals.Facebook.logout();
	Ti.UI.createAlertDialog({
		title:"Animales sin Hogar",
		message:"Para cerrar la sesión por completo debe cerrar la aplicación!"
	}).show();
}
