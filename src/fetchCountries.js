// fetchCountries.js
export function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1/name/';
  const API_FILTR = `?fields=name,capital,population,flags,languages`;

  return fetch(`${BASE_URL}${name}${API_FILTR}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      return data;
    });
}
