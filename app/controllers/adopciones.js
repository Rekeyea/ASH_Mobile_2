var args = arguments[0] || {};

$.adopcion.addEventListener("close", function(){
    $.destroy();
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
	Alloy.createController("padrinos").getView().open();
}

function adoptar(){
	Menu();
}


function mail(){
	var emailDialog = Ti.UI.createEmailDialog();
	emailDialog.subject = "Quiero Adoptar";
	emailDialog.toRecipients = ['adopciones@animalessinhogar.org'];
	emailDialog.messageBody = '';
	emailDialog.open();
}