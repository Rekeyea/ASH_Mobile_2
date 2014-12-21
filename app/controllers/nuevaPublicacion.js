var args = arguments[0] || {};

var bytes = [];
var tipoElegido = 1;
var tipos = _.map(Alloy.Globals.Tipos,function(tipo){
	return Ti.UI.createPickerRow({
		title:tipo
	});
});
$.pckTipo.add(tipos);

function ElegirDesde(){
	//le pido al usuario que elija
	var dialog =Ti.UI.createOptionDialog({
		title: "Como desea subir la imagen",
		options:["Cancelar","Tomar una Foto","Mi Galería"],
		cancel:0,
		selectedIndex:0
	}); 
	dialog.addEventListener("click",function(evt){
		if(!evt.cancel){
			var index = evt.index;
			var obj = {
				"success":Success,
				"cancel":Cancel,
				"error":Error
			}; 
			if(index==1){
				Titanium.Media.showCamera(obj);
			}else{
				Titanium.Media.openPhotoGallery(obj);
			}
		}
	});
	dialog.show();
}

function Success(evt){
	bytes = evt.media;
	$.imgImg.width=100;
	$.imgImg.height=10
	$.imgImg.image = bytes;
}

function Cancel(evt){
	
}

function Error(evt){
	
}

function Publicar(){
	var obj = {
		IdFacebook : Alloy.Globals.Facebook.uid,
		titulo: $.txtTitulo.value,
		descripcion:$.txaDesc.value,
		tipo:tipoElegido,
		ubicacion_X:-34.9081,
		ubicacion_Y:-56.1989,
		foto:bytes,
		fecha:"2014-12-21"
	};
	var postData = {
		Accion:"RealizarPublicacion",
		Data:obj,
		Correcto:function(d){
			$.nuevaPublicacion.close();
		},
		Error:function(e){
			Ti.UI.createAlertDialog({
				title:"Publicaciones",
				message:"Ocurió un error al obtener las publicaciones!"
			}).show();
		}
	};
	Alloy.Globals.Service.Ejecutar(postData);
}
