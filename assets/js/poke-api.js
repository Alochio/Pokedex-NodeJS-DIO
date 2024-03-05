const pokeApi = {};

pokeApi.getPokemonDatail = (pokemon) => {
  return fetch(pokemon.url).then((response) => response.json());
};

pokeApi.getPokemons = (offset = 1, limit = 10) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDatail))
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokemonsDetails) => pokemonsDetails);
};
