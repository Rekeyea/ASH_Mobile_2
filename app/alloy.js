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
Alloy.Globals.URL = "http://192.168.56.1/ASHServices/Service1.svc/";
Alloy.Globals.Publicaciones = Alloy.createCollection("Publicacion");
Alloy.Globals.Tipos = ["Adopción","Perdido","Encontrado","Robado","Maltradado"];
Alloy.Globals.ImagenesTipos = ["","/enadopcion.png","/perdido.png","/encontrado.png","/robado.png","/maltratado.png"];
Alloy.Globals.MapaImagenesTipos = ["","/enadopcion-mapa.png","/perdido-mapa.png","/encontrado-mapa.png","/robado-mapa.png","/maltratado-mapa.png"];
Alloy.Globals.String = require("alloy/string");
Alloy.Globals.Width = Titanium.Platform.getDisplayCaps().getPlatformWidth() - 20; 
