const pokemonList = document.getElementById(`pokemonList`);
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 200; //Limite máximo de exibir pokemons
const limit = 12;
let offset = 0;

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map(
        (pokemon) => `
             <li class="pokemon openModal ${pokemon.type}">
                  <span class="number">#${pokemon.number}</span>
                  <span class="name">${pokemon.name}</span>
                  <div class="detail">
                      <ol class="types">
                          ${pokemon.types
                            .map(
                              (type) =>
                                `<li class="type ${pokemon.type}">${type}</li>`
                            )
                            .join("")}
                      </ol>
                      <img src="${pokemon.photo}"
                          alt="${pokemon.name}">
                  </div>
              </li>
      `
      )
      .join("");
    pokemonList.innerHTML += newHtml;

    // Adiciona um evento de clique a cada elemento
    var openModalElements = document.getElementsByClassName("openModal");
    for (var i = 0; i < openModalElements.length; i++) {
      openModalElements[i].addEventListener("click", function () {
        var modalElement = document.getElementById("exampleModal");
        var modal = new bootstrap.Modal(modalElement);
        modal.show();
      });
    }
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, limit);

    //loadMoreButton.parentElement.removeChild(loadMoreButton); -> Tirando a função de limite máximo (podemos ver todos os pokemons da API)
  } else {
    loadPokemonItens(offset, limit);
  }
});
