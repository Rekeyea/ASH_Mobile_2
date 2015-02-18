var args = arguments[0] || {};

$.adopciones.addEventListener("close", function(){
    $.destroy();
});

function mail(){
	var emailDialog = Ti.UI.createEmailDialog();
	emailDialog.subject = "Quiero Adoptar";
	emailDialog.toRecipients = ['adopciones@animalessinhogar.org'];
	emailDialog.messageBody = '';
	emailDialog.open();
}
