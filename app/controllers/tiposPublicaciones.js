var args = arguments[0] || {};

function CategoriaSeleccionada(e){
	Ti.API.info("INDICE TIPO: "+e.source.itemId);
	Alloy.Globals.AbrirVentana("nuevaPublicacion",{
		tipo: e.source.itemId,
		anterior:$.tiposPublicaciones
	});
	$.tiposPublicaciones.close();
}
