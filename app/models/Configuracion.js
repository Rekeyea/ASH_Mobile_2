exports.definition = {
	config: {
		columns: {
		    "UID": "int PRIMARY KEY",
		    "Nombre": "text",
		    "Mail": "text",
		    "Telefono": "text",
		    "Notificaciones": "tinyint"
		},
		adapter: {
			type: "sql",
			collection_name: "Configuracion",
			idAttribute:"UID"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};