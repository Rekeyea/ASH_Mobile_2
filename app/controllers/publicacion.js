var args = arguments[0] || {};
var publicacion = args["Publicacion"];
var service = Alloy.Globals.Service;
var autor = {};

var service = Alloy.Globals.Service;


$.modeloPublicacion.set(publicacion);
$.imgP.setImage(publicacion.foto);


function VerEnMapa(evt){
	Alloy.createController("mapa",{
		"unica":true,
		"Publicacion":publicacion
	}).getView().open();
}

function Contactar(evt){
	var diag = Ti.UI.createOptionDialog({
		title:"Contactar",
		options:["Por EMail","Por Teléfono","Cancelar"],
		cancel:2
	});
	diag.addEventListener("click",function(evt){
		if(evt.index<0){
			
		}else{
			if(evt.index == evt.cancel){
				
			}else{
				var index = evt.index;
				if(index==0){
					
				}else{
					
				}
			}
		}
	});
	diag.show();
}

function Denunciar(evt){
	var denuncia = {
		"IdFacebook":Alloy.Globals.Facebook.uid,
		"IdPublicacion":publicacion.IdPublicacion
	};
	service.Ejecutar({
		Accion:"DenunciarPublicacion",
		Data:JSON.stringify(denuncia),
		Correcto:function(d){
			Ti.API.info(JSON.stringify(d));
		},
		Error:function(e){
			Ti.UI.createAlertDialog({
				title: "Denuncia",
				message:"No fué posible realizar la denuncia"
			}).show();
		}
	});
}



//#### parte comun
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


function verPublicaciones(){
	Alloy.createController("publicaciones").getView().open();
}

function Atras(){
	$.index.close();
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
