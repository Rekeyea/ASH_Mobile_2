var fb = Alloy.Globals.Facebook;
fb.appid = "806668239384942";
fb.permissions = ["public_profile","email"];
var seguirRotando = false;
var animation;
var rotaciones = 0;

fb.addEventListener("login",function(evt){
	if(evt.success){
		Ti.API.info("************ DATOS DE FACEBOOK **************");
		var data = evt.data;
		var obj = {
			"UID":data.id,
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

if(fb.loggedIn){
	//TODO: El problema con esto es que tambien hay que hacerlo visible 
	//cuando cierro sesion
	$.fbButton.setVisible(false);
	IniciarSesion(fb.uid);
}

Ti.App.addEventListener("CierroSesion",function(){
	$.fbButton.setVisible(false);
});

function IniciarSesion(id){
	seguirRotando = true;
	EfectuarRotacion();
	var obj = {
		Accion:"IniciarSesion",
		Data:id,
		Correcto:function(data){
			Ti.API.info("PUEDO PASAR A LA SIGUIENTE PANTALLA");
			Alloy.Globals.AbrirVentana("publicaciones");
		},
		Error: function(evt){
			Ti.UI.createAlertDialog({
				title:"Iniciar Sesión",
				message:"No ha sido posible iniciar sesión."
			}).show();
		}
	};
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

if(Alloy.Globals.Plataforma=="android"){
	$.index.open();
}
