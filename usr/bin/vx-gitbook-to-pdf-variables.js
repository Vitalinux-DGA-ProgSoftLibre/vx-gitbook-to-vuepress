#!/home/arturo/.nvm/versions/node/v8.9.4/bin/node

const fs = require('fs');
const path = require("path");

const check_array_strings = (x) => {
	return x.every(i => (typeof i === "string"))
}

const check_array_objects = (x) => {
	return x.every(i => (typeof i === "object"))
}

const replaceLast = (find, replace, string) => {
	var lastIndex = string.lastIndexOf(find);
	if (lastIndex === -1) {
		return string;
	}
	var beginString = string.substring(0, lastIndex);
	var endString = string.substring(lastIndex + find.length);
	return beginString + replace + endString;
}

const devolver_string = (search, replace) => {
	let resultado = `{ search: "{{ *${search} *}}", `
	resultado += `replace: (match, p1, offset, string, groups) => `
	resultado += `"${replace}", flags: "ig" }`
	return resultado
}

// Quitamos de los argumentos el nombre del programa y la ruta, dejando únicamente los parámetros:
// https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/
var myArgs = process.argv.slice(2);

// Comprobamos que el primer parámetro es el de un archivo:
//let ruta_file = path.resolve(__dirname, "./curso-vitalinux/book.json");
console.log("=> El fichero pasado como parámetro es: " + myArgs[0]);
let ruta_file = path.resolve(__dirname, myArgs[0]);
if (fs.existsSync(ruta_file)) {
	console.log("=> Existe el fichero y lo voy a leer ...");
	contenido = fs.readFileSync(ruta_file, "utf8");
	console.log("Variables del fichero: " + JSON.parse(contenido).variables)
	console.log(JSON.parse(contenido).variables)
	// console.log(
	miarr = Object.keys(JSON.parse(contenido).variables).map((key) => {
		if (typeof JSON.parse(contenido).variables[key] === "string") {
			// return `{
			// search: "{{ *${key} *}}",
			// replace: (match, p1, offset, string, groups) => 
			// "${JSON.parse(contenido).variables[key]}", flags: "ig" }`
			return devolver_string(key, JSON.parse(contenido).variables[key])
		}
		if (Array.isArray(JSON.parse(contenido).variables[key])) {
			let resultado = []
			// Comprobamos si es un array de Strings:
			if (check_array_strings(JSON.parse(contenido).variables[key])) {
				JSON.parse(contenido).variables[key].forEach((el, index) => {
					resultado.push(devolver_string(key + "[" + index + "]", JSON.parse(contenido).variables[key][index]))
				});
				resultado.push(devolver_string(key, replaceLast(',', ' y', JSON.parse(contenido).variables[key].join(', '))))
				// return devolver_string(key, replaceLast(',', ' y', JSON.parse(contenido).variables[key].join(', ')))
				return resultado.join(",")
			}
			if (check_array_objects(JSON.parse(contenido).variables[key])) {
				// forEach no devuelve nada, debemos actuar dentro del bucle:
				JSON.parse(contenido).variables[key].forEach((el, index) => {
					resultado.push(Object.keys(el).map((key2) => {
						return devolver_string(key + "[" + index + "]." + key2, el[key2])
					}))
				})
				return resultado.join(",")
			}
		}
	})
	// );
	console.log("=> La longitud de componentes del resultado es: " + miarr.length)
	console.log(miarr)
} else {
	console.log("=> El fichero indicado como parámetro no existe ...")
}