var args = arguments[0] || {};
var publicacion = args["Publicacion"];
var service = Alloy.Globals.Service;
var autor = {};

var service = Alloy.Globals.Service;

$.modeloPublicacion.set(publicacion);
$.imgP.setImage(publicacion.foto);


function VerEnMapa(evt){
	Alloy.Globals.AbrirVentana("mapa",{
		"unica":true,
		"Publicacion":publicacion
	});
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
					var dialog = Titanium.UI.createEmailDialog({
						subject:$.modeloPublicacion.get("titulo"),
						toRecipients:[$.modeloPublicacion.get("autorMail")]
					});
					dialog.open();
				}else{
					Ti.Platform.openURL("tel:"+$.modeloPublicacion.get("autorNumero"));
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

