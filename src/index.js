// k4ZuaibW7VaW2DqWiJtNRmwq3dAdRpv6;
// eagles;
import { findParametr } from './js/api';
import eventCard from './templates/event-card.hbs';
const ulEl = document.querySelector('.js-list');
const btnEl = document.querySelector('.js-btn');
const formInputEl = document.querySelector('.form-input');
let page = 0;
let findText = 'nirvana';
btnEl.addEventListener('click', loadData);
formInputEl.addEventListener('submit', searchData);

findParametr(findText, page)
  .then(data => {
    const result = eventCard(data._embedded.events);
    renderList(result);
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  });

function renderList(string) {
  ulEl.insertAdjacentHTML('beforeend', string);
}
function loadData() {
  page += 1;

  findParametr(findText, page)
    .then(data => {
      if (page === data.page.totalPages) {
        btnEl.classList.add('is-hidden');
        return;
      }
      const result = eventCard(data._embedded.events);
      renderList(result);
    })
    .catch(err => {
      console.log(err);
    });
}
function searchData(ev) {
  ev.preventDefault();
  page = 0;
  findText = ev.target.elements.input.value.trim();
  if (!findText) {
    console.log('hello');
    return;
  }
  ulEl.innerHTML = '';
  findParametr(findText, page)
    .then(data => {
      const result = eventCard(data._embedded.events);
      renderList(result);
    })
    .catch(err => {
      console.log(err);
    });
}
