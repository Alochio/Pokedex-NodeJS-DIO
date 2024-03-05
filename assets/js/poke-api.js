const pokeApi = {};

function convertPokeApiDatailToPokemon(pokeDatail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDatail.order;
  pokemon.name = pokeDatail.name;
  pokemon.types = pokeDatail.types.map((typeSlot) => typeSlot.type.name);
  pokemon.type = pokemon.types.length > 0 ? pokemon.types[0] : '';
  pokemon.photo = pokeDatail.sprites.other.dream_world.front_default;

  return pokemon;
}

pokeApi.getPokemonDatail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDatailToPokemon);
};

pokeApi.getPokemons = (offset, limit) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDatail))
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokemonsDetails) => pokemonsDetails);
};
