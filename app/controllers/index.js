if(Alloy.Globals.Plataforma=="android"){
	
}else{
	if(Alloy.Globals.EsNuloNavegador()){
		Alloy.Globals.ElNavegador($.navigator);
	}
	$.navigator.open();	
}