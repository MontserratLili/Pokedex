var cargarPagina = function (){
  //llamo a mi modal
    $.getJSON("http://pokeapi.co/api/v2/pokemon/", 
	function (response) {
	var pokemons = response.results;
	mostrarPokemons(pokemons);
    $("body").on("click", ".botonPokemon", obtenerDatos);
});
};

//plantilla tarjetas
var plantillaPokemons = "<div class='col-xs-3 jumbotron ficha'>" +
            "<button type='button' class='col-xs-12 botonPokemon text-center btn btn-primary' data-toggle='modal' data-info='__url__' data-target='.bs-example-modal-lg'>__name__</button>" +
            "<img src='assets/imagenes/__name__.png' alt='' class='imagenesPokemones img-responsive'>" + "</div>";


var mostrarPokemons = function (pokemons) {
	var plantillaFinal = "";
	pokemons.forEach(function (pokemons) {
		plantillaFinal += plantillaPokemons.replace("__name__", pokemons.name)
        .replace("__name__", pokemons.name)
        .replace("__url__", pokemons.url);
	});
	$(".pokebola").html(plantillaFinal);
};

var obtenerDatos = function(pokemons){
    var nombre = $(this).text();
    var imagen = $(this).next().attr("src");
    var url = $(this).data("info");
    $.getJSON(url, function(response){
        var urlDos = response.species.url;
        $.getJSON(urlDos, function(response){
            var habitat = response.habitat.name;
            var color = response.color.name;
            var shape = response.shape.name;
            var genera = response.genera[0].genus;
            
            mostrarDatos({
                nombre: nombre,
                imagen: imagen,
                habitat: habitat,
                color: color,
                shape: shape,
                genera: genera
            });
        });
    });
};


var plantillaPokemonIndividual = 
                    "<h1 class='text-center'>__name__</h1>" +
                    "<div class='text-center col-xs-6 contenedorModal'>" +
                        "<img src='assets/imagenes/__imagen__.png' alt='__name__'>"+
                    "</div>" +
                    "<div class='text-center col-xs-6 contenedorModal'>" +
                        "<p><label>Habitat:</label>__habitat__</p>" +
                        "<p><label>Color:</label>__color__</p>" +
                        "<p><label>Forma:</label>__shape__</p>" +
                        "<p><label>Genera:</label>__genera__</p>" +
                    "</div>";
                

var mostrarDatos = function(datos){
    var plantillaFinalIndividual = "";
    mostrarDatos.forEach(function (datos){
        plantillaFinalIndividual += plantillaPokemonIndividual.replace("__name__", datos.nombre)
        .replace("__name__", datos.nombre)
        .replace("__imagen__", datos.imagen)
        .replace("__name__", datos.nombre)
        .replace("__habitat__", datos.habitat)
        .replace("__color__", datos.color)
        .replace("__shape__", datos.shape)
        .replace("__genera__", datos.genera)
    });
    $(".modalPokemon").html(plantillaPokemonIndividual);
};


$(document).ready(cargarPagina);