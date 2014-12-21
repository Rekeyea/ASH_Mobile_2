var args = arguments[0] || {};

$.configuracion.addEventListener("close", function(){
    $.destroy();
    alert("close");
});


var obj = Ti.App.Properties.getObject("DatosUsuario");
var uid = Alloy.Globals.Facebook.uid;
var nombre = obj.Nombre || "";
var mail = obj.Mail || "";
var tel = obj.Telefono || "";
var notifs = obj.Notificaciones || 0;

$.configuracionModel.set({
	"UID":uid,
	"Nombre":nombre,
	"Mail":mail,
	"Telefono":tel,
	"Notificaciones":notifs
});

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