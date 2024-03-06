const pokemonList = document.getElementById(`pokemonList`);
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 200;
const limit = 10;
let offset = 0;
let pokemons = [];

function createModalOpener() {
  return function (event) {
    var index = event.currentTarget.dataset.index;
    var pokemon = pokemons[index];

    var modalElement = document.getElementById("exampleModal");
    var modal = new bootstrap.Modal(modalElement);

    var modalTitle = document.getElementById("modalName");
    modalTitle.textContent = pokemon.name;

    var modalImg = modalElement.getElementsByTagName("img")[0];
    modalImg.src = pokemon.photo;

    var modalType = modalElement.getElementsByTagName("p")[0];
    modalType.textContent = "Tipo principal: " + pokemon.types[0];

    var modalSecondaryType = modalElement.getElementsByTagName("p")[1];
    modalSecondaryType.textContent = pokemon.types[1]
      ? "Tipo secundário: " + pokemon.types[1]
      : "";

    var pokemonType = pokemon.types[0];
    var modalElement = document.getElementById("modalDetails");

    var pokemonTypes = [
      "normal",
      "grass",
      "fire",
      "water",
      "electric",
      "ice",
      "ground",
      "flying",
      "poison",
      "fighting",
      "psychic",
      "dark",
      "rock",
      "bug",
      "ghost",
      "steel",
      "dragon",
      "fairy",
    ];

    for (var i = 0; i < pokemonTypes.length; i++) {
      modalElement.classList.remove(pokemonTypes[i]);
    }

    modalElement.classList.add(pokemonType);

    modal.show();
  };
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((newPokemons = []) => {
    pokemons = pokemons.concat(newPokemons);
    const newHtml = newPokemons
      .map(
        (pokemon, index) => `
             <li class="pokemon openModal ${pokemon.type}" data-index="${
          index + offset
        }">
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

    var openModalElements = document.querySelectorAll(".openModal");

    openModalElements.forEach((element) => {
      element.addEventListener("click", createModalOpener());
    });
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
