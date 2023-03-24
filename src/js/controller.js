import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView';
import resultsView from './views/resultsView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {async} from 'regenerator-runtime';

///////////////////////////////////////

if (module.hot) {
  module.hot.accept();
}

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
    resultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) render results
    resultsView.render(model.state.search.results);
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
