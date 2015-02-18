var args = arguments[0] || {};

$.padrinos.addEventListener("close", function(){
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

function adoptar(){
	Alloy.Globals.AbrirVentana("adopciones");
}

function mail(){
	var emailDialog = Ti.UI.createEmailDialog();
	emailDialog.subject = "Padrinos: Dar de baja";
	emailDialog.toRecipients = ['adopciones@animalessinhogar.org'];
	emailDialog.messageBody = '';
	emailDialog.open();
}

