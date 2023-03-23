import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); //apuntar al hashs
    console.log(id);

    if (!id) return;
    recipeView.renderSpinner();
    //1) Cargando recipiente
    await model.loadRecipe(id);

    //2) renderizando la receta

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function() {
  try {
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) render results
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};
controlSearchResults();


const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
