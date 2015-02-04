var args = arguments[0] || {};

var tipo = args.tipo + 1 || 0;

function confImag(){
	var imagen = Alloy.Globals.ImagenesTipos[tipo];
	$.imgTipo.image = imagen;
} 

var bytes = [];


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
	$.viewImage.borderWidth = 0;
	$.viewImage.borderColor = "transparent";
	bytes = evt.media;
	$.imgImg.width=100;
	$.imgImg.height=100;
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
		tipo:tipo,
		ubicacion_X:-34.9081,
		ubicacion_Y:-56.1989,
		foto:Ti.Utils.base64encode(bytes).toString(),
		fecha:"2014-12-21"
	};
	Ti.API.info(JSON.stringify(obj));
	var postData = {
		Accion:"RealizarPublicacion",
		Data:JSON.stringify(obj),
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
	$.nuevaPublicacion.close();
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
