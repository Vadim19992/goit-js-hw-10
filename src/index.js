import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function updateCountryList(countries) {
  countryList.innerHTML = '';
  if (countries.length > 10) {
    Notiflix.Notify.warning(
      'Too many matches found. Please enter a more specific name.'
    );
  } else {
    countries.forEach(country => {
      const listItem = document.createElement('li');
      listItem.classList.add('country-item');
      listItem.innerHTML = `
      <h2><img src="${country.flags.svg}" alt="Flag" class="flag"> ${country.name.official}</h2>
      <p><strong>Capital:</strong> ${country.capital}</p>
      <p><strong>Population:</strong> ${country.population}</p>
      <p><strong>Languages:</strong> ${country.languages}</p>`;
      countryList.appendChild(listItem);
    });
  }
}

const debouncedSearch = debounce(() => {
  const searchTerm = searchBox.value.trim();
  if (searchTerm === '') {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }
  fetchCountries(searchTerm)
    .then(countries => {
      updateCountryList(countries);
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}, 300);

searchBox.addEventListener('input', debouncedSearch);
