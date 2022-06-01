// k4ZuaibW7VaW2DqWiJtNRmwq3dAdRpv6;
// eagles;
import { findParametr } from './js/api';
import eventCard from './templates/event-card.hbs';
const ulEl=document.querySelector(".js-list")


findParametr('eagles')
    .then(data => {
      const result = eventCard(data._embedded.events);
      renderList(result);
            console.log(data);

  })
  .catch(err => {
    console.log(err);
  });

function renderList(string) {
      ulEl.insertAdjacentHTML("beforeend", string);
  }