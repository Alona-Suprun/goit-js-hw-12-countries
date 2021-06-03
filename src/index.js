import "./sass/main.scss";
import countryCardTpl from "./templates/country-card.hbs";
import countriesListTpl from "./templates/country-list.hbs";
import API from "./fetchCountries";
import debounce from "lodash.debounce";

const cardContainer = document.querySelector(".js-card-container");
const searchInput = document.querySelector(".js-search-input");
const listContainer = document.querySelector(".js-list-container");

const makeCountryCard = (country) => {
  const markup = countryCardTpl(country);
  cardContainer.innerHTML = markup;
};

const makeCountriesList = (list) => {
  const contriesList = countriesListTpl(list);
  listContainer.innerHTML = contriesList;
};

const clearList = () => {
  listContainer.innerHTML = " ";
};

const countryInfoSearch = (countries) => {
  if (countries.length > 10) {
    tooMany();
  } else if (countries.length > 1 && countries.length <= 10) {
    makeCountriesList(countries);
  } else if (countries.length === 1) {
    clearList();
    makeCountryCard(countries);
  }
};

const onFetchError = (error) => {
  clearList();
};

const onCountrySearch = (e) => {
  const searchQuery = e.target.value;

  API.fetchCountries(searchQuery).then(countryInfoSearch).catch(onFetchError);
};

searchInput.addEventListener("input", debounce(onCountrySearch, 500));
