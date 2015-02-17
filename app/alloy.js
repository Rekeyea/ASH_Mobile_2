// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
Alloy.Globals.Facebook = require("facebook");
Alloy.Globals.Map = require("ti.map");
Alloy.Globals.Service = require("Service");
Alloy.Globals.URL = "http://192.168.1.106/ASHServices/Service1.svc/";
Alloy.Globals.Publicaciones = Alloy.createCollection("Publicacion");
Alloy.Globals.Tipos = ["Adopción","Perdido","Encontrado","Robado","Maltradado"];
Alloy.Globals.ImagenesTipos = ["","/enadopcion.png","/perdido.png","/encontrado.png","/robado.png","/maltratado.png"];
Alloy.Globals.MapaImagenesTipos = ["","/enadopcion-mapa.png","/perdido-mapa.png","/encontrado-mapa.png","/robado-mapa.png","/maltratado-mapa.png"];
Alloy.Globals.String = require("alloy/string");
Alloy.Globals.Width = Titanium.Platform.getDisplayCaps().getPlatformWidth() - 40; 
Ti.Geolocation.purpose = "Obtener las publicaciones más cercanas al usuario.";

Alloy.Globals.AbrirVentana = Open;
Alloy.Globals.ElNavegador = SetNavigator;
Alloy.Globals.EsNuloNavegador = function() { return (navigator == null) ? true : false;};

Alloy.Globals.Plataforma = Titanium.Platform.getOsname();

var navigator = null;
var navStack = [];

function SetNavigator(nav){
	navigator = nav;
}
function Open(nombreController,parametros){
	
	function CerrarVentana(item){
		var win = item.Ventana;
		var nom = item.Nombre;
		if(nom == nombreController){
			//antes de cerrar la ventana devuelvo todo a su lugar
			while(!_.isEmpty(aux)){
				navStack.push(aux.pop());	
			}
			AbrirVentana();
		}else{
			win.addEventListener("close",function(){
				var elem = aux.pop();
				CerrarVentana(elem.Ventana);
			});	
		}
		win.close();
	}
	
	function AbrirVentana(){
		var elem = {
			Nombre:nombreController,
			Ventana:win
		};
		navStack.push(elem);
		navigator.openWindow(win);
	}
	
	var cont = Alloy.createController(nombreController,parametros);
	var win = cont.getView();
	if(!_.isNull(navigator)){
		//si ya esta en el stack, rompo todas las pantallas anteriores
		if(_.contains(_.pluck(navStack,"Nombre"),nombreController)){
			//paso todo a un stack auxiliar
			var aux = [];
			while(!_.isEmpty(navStack)){
				aux.push(navStack.pop());	
			}
			//ahora saco de aux todo hasta que llegue a lo que busco y el resto lo devuelvo a navStack
			var elem = aux.pop();
			//los voy cerrando
			CerrarVentana(elem);
		}else{
			AbrirVentana();	
		}
	}else{
		win.open();
	}
}
