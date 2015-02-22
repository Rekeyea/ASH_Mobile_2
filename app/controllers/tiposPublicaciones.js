var args = arguments[0] || {};

function CategoriaSeleccionada(e){
	Alloy.Globals.AbrirVentana("nuevaPublicacion",{
		tipo: e.index
	});
	$.tiposPublicaciones.close();
}
