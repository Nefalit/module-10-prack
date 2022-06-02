// k4ZuaibW7VaW2DqWiJtNRmwq3dAdRpv6;
// eagles;

const API_KEY = 'k4ZuaibW7VaW2DqWiJtNRmwq3dAdRpv6';
const ROOT_URL = 'https://app.ticketmaster.com/discovery/v2/events.json';

export const findParametr = (query, page) => {
  return fetch(
    `${ROOT_URL}?apikey=${API_KEY}&keyword=${query}&size=50&page=${page}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
