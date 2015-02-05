exports.definition = {
	config: {
		columns: {
		    "IdPublicacion": "int PRIMARY KEY",
		    "titulo": "text",
		    "descripcion": "text",
		    "tipo": "tinyint",
		    "ubicacion_X": "real",
		    "ubicacion_Y": "real",
		    "foto": "blob",
		    "fecha": "text",
		    "autorId": "int",
		    "autorNumero":"text",
		    "autorMail":"text",
		    "autorNombre":"text"
		},
		adapter: {
			type: "sql",
			collection_name: "Publicacion",
			idAttribute:"IdPublicacion"
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