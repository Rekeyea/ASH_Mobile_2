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
ObtenerPublicaciones();

function transformarPublicacion(publicacion){
	var copia = publicacion.toJSON();
	Ti.API.info(tiposImgs[copia.tipo-1]);
	var res = {
		titulo:copia.titulo,
		descripcion:copia.descripcion,
		foto:copia.foto,
		tipoImg:tiposImgs[copia.tipo-1]
	};
	return res;
}

function ObtenerPublicaciones(){
	page++;
	var obj = {
		IdFacebook : facebookId,
		tipo:tipos.indexOf(elegido),
		masCerca:nearest,
		recientes:recent,
		ubicacion_actual_x:0,
		ubicacion_actual_y:0,
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
				Alloy.Collections.Publicacion.add(elem);
			});
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

function IrAMapa(){
	Alloy.createController("mapa").getView().open();
}


 

