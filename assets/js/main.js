const pokemonList = document.getElementById(`pokemonList`);
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 200; //Limite máximo de exibir pokemons
const limit = 10;
let offset = 0;

function createModalOpener(pokemon) {
  
  return function () {
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



    // Lista de todas as classes de tipo de Pokémon
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

    

    // Remove todas as classes de tipo de Pokémon
    for (var i = 0; i < pokemonTypes.length; i++) {
      modalElement.classList.remove(pokemonTypes[i]);
    }

    // Adiciona a classe do tipo de Pokémon atual
    modalElement.classList.add(pokemonType);
    console.log(pokemonType);

    modal.show();

    console.log(passei);
  };
}

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

    // Obtenha todos os elementos abertos do modal
    var openModalElements = document.querySelectorAll(".openModal");

    // Adicione o evento de clique a cada elemento
    openModalElements.forEach((element, index) => {
      element.addEventListener("click", createModalOpener(pokemons[index]));
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

