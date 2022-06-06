// k4ZuaibW7VaW2DqWiJtNRmwq3dAdRpv6;
// eagles;
import { findParametr, findCurrentElInfo } from './js/api';
import eventCard from './templates/event-card.hbs';
import { pagination } from './js/pagination';
const puginationWrapperEl = document.querySelector('.pugination-wrapper');
puginationWrapperEl.style.display = 'none';

const ulEl = document.querySelector('.js-list');
// const btnEl = document.querySelector('.js-btn');
const formInputEl = document.querySelector('.form-input');
let page = 0;
let findText = '';
// btnEl.addEventListener('click', loadData);
formInputEl.addEventListener('submit', searchData);
const backDrop = document.querySelector('.backdrop');
const modalEl = document.querySelector('.module');
// findParametr(findText, page)
//   .then(data => {
//     const result = eventCard(data._embedded.events);
//     renderList(result);
//     console.log(data);
//   })
//   .catch(err => {
//     console.log(err);
//   });

export function renderList(string) {
  ulEl.innerHTML = string;
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
      localStorage.setItem('FindText', `${findText}`);
      pagination(data.page.totalPages);
    })
    .catch(err => {
      pagination(0);
      console.log(err);
    });
}
ulEl.addEventListener('click', onItemCardClick);

function onItemCardClick(event) {
  if (event.target.nodeName === 'UL') {
    return;
  }
  const currentId = event.target.closest('li').id;

  findCurrentElInfo(currentId)
    .then(response => {
      renderModalContant(response);
      console.dir(response);
    })
    .catch(err => console.log(err));

  backDrop.classList.add('is-open');
  ulEl.removeEventListener('click', onItemCardClick);
  backDrop.addEventListener('click', onModalCloseClick);
}
function onModalCloseClick(event) {
  if (!event.target.classList.contains('module')) {
    backDrop.removeEventListener('click', onModalCloseClick);
    backDrop.classList.remove('is-open');
    ulEl.addEventListener('click', onItemCardClick);
  }
}

function renderModalContant(obj) {
  modalEl.innerHTML = '';
  const {
    dates: {
      start: { localDate, localTime },
      status: { code },
      timezone,
    },
    images: [{ url: imgUrl }],
    name,
    info,
    ticketLimit: { info: ticketInfo },
    url: ticketUrl,
  } = obj;
  // console.log(info);
  console.log(ticketUrl);

  const markUp = `<h2 class="title">${name}</h2>
<img src=${imgUrl} width="400" alt=${name} />
<p>About: ${info || 'no information'}</p>
<p>Venue: ${timezone}</p>
<p>Date and Time: ${localDate}, ${localTime}</p>
<p>Ticket info: ${ticketInfo}</p>
<p>Available to buy: ${code}</p>
<a class="link-buy" rel="noopener noreferrer" href="${ticketUrl}">Buy</a>`;

  modalEl.insertAdjacentHTML('beforeend', markUp);
}
