var args = arguments[0] || {};

$.padrinos.addEventListener("close", function(){
    $.destroy();
});

$.padrinos.addEventListener("open", function(evt) { 
    
    var actionBar = $.padrinos.activity.actionBar; 
    actionBar.onHomeIconItemSelected = Menu;
    
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
	Alloy.createController("configuracion").getView().open();
}

function donar(){
	Alloy.createController("donaciones").getView().open();
}

function padrinos(){
	Menu();
}

function adoptar(){
	Alloy.createController("adopciones").getView().open();
}

function mail(){
	var emailDialog = Ti.UI.createEmailDialog();
	emailDialog.subject = "Padrinos: Dar de baja";
	emailDialog.toRecipients = ['adopciones@animalessinhogar.org'];
	emailDialog.messageBody = '';
	emailDialog.open();
}

