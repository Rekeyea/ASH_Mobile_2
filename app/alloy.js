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
Alloy.Globals.ImagenesTipos = ["","/adopt.png","/lost.png","/found.png","/stolen.png","/badtreat.png"];
Alloy.Globals.MapaImagenesTipos = ["","/adopt-min.png","/lost-min.png","/found-min.png","/stolen-min.png","/badtreat-min.png"];
