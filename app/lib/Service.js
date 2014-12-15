exports.Ejecutar = function(obj){
	var URL = Alloy.Globals.URL+obj.Accion;
	var data = obj.Data;
	var Success = obj.Correcto;
	var Error = obj.Error;
	Ti.API.info(URL);
	var cliente = Ti.Network.createHTTPClient({
			onload:function(){
				var result = JSON.parse(this.responseText);
				Success(result);
			},
			onerror:Error
	});
	cliente.open("POST",URL);
	cliente.setRequestHeader("Content-Type","application/json");
	cliente.send(data);
};
