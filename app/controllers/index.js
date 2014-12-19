var fb = Alloy.Globals.Facebook;
fb.appid = "806668239384942";
fb.permissions = ["public_profile","email"];
var seguirRotando = false;
var animation;
var rotaciones = 0;

fb.addEventListener("login",function(evt){
	if(evt.success){
		Ti.API.info("************ DATOS DE FACEBOOK **************");
		var data = JSON.parse(evt.data);
		var obj = {
			"UID":evt.data.id,
			"Nombre": Alloy.Globals.String.urlDecode(data.name),
			"Mail":Alloy.Globals.String.urlDecode(data.email),
		};
		Ti.App.Properties.setObject("DatosUsuario",obj);
		Ti.API.info(JSON.stringify(obj));
		IniciarSesion(evt.uid);
	}else{
		Ti.UI.createAlertDialog({
			title:"Facebook",
			message:"No fué posible iniciar sesión con Facebook"
		}).show();
	}
});
$.index.open();

if(fb.loggedIn){
	IniciarSesion(fb.uid);
}

function IniciarSesion(id){
	seguirRotando = true;
	EfectuarRotacion();
	var obj = {
		Accion:"IniciarSesion",
		Data:id,
		Correcto:function(data){
			Ti.API.info("PUEDO PASAR A LA SIGUIENTE PANTALLA");
			Alloy.createController("publicaciones").getView().open();
		},
		Error: function(evt){
			Ti.UI.createAlertDialog({
				title:"Iniciar Sesión",
				message:"No ha sido posible iniciar sesión."
			}).show();
		}
	};
	Ti.API.info("********************* OBJETO ********************");
	Ti.API.info(JSON.stringify(obj));
	Alloy.Globals.Service.Ejecutar(obj);
	setTimeout(function(){
		seguirRotando = false;
		rotaciones = 0;
	},10000);
}

function IniciarSesionFacebook(){
	if(fb.loggedIn){
		IniciarSesion(fb.uid);
	}else{
		fb.authorize();	
	}
}

function EfectuarRotacion(){
	if(seguirRotando){
		animation = rotar();
		animation.addEventListener("complete",EfectuarRotacion);
	}
}
function rotar () {
  	var t = Ti.UI.create2DMatrix();
	var spin = Ti.UI.createAnimation({
		duration:1000
	});
	rotaciones++;
	var degrees = rotaciones*360;
	t = t.rotate(degrees);
	spin.transform = t;
	$.logo.animate(spin);
	return spin;
}