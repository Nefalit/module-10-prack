const backBtnEl = document.querySelector('.js-back');
const forwerdBtnEl = document.querySelector('.js-forward');
const paginationListEl = document.querySelector('.pugination-list');
const puginationWrapperEl = document.querySelector('.pugination-wrapper');
backBtnEl.disabled = true;
import { findParametr } from './api';
import { renderList } from '../index';
import eventCard from '../templates/event-card.hbs';

export function pagination(totalPages) {
  if (totalPages <= 1) {
    puginationWrapperEl.style.display = 'none';
    return;
  }
  puginationWrapperEl.style.display = 'flex';
  let buttonMarkup = '';
  let iterator = 0;
  const maxPages = 5;

  if (maxPages > totalPages) {
    iterator = totalPages;
    forwerdBtnEl.disabled = true;
  } else {
    iterator = maxPages;
    forwerdBtnEl.disabled = false;
  }
  for (let i = 1; i <= iterator; i += 1) {
    buttonMarkup += `<li class="item"><a href="">${i}</a></li>`;
  }

  paginationListEl.innerHTML = buttonMarkup;
  paginationListEl.addEventListener('click', onLinkPageClick);
  console.log(buttonMarkup);
}

function onLinkPageClick(event) {
  event.preventDefault();
  const pageNumber = event.target.textContent;
  console.log(pageNumber);
  console.log(localStorage.getItem('FindText'));

  findParametr(localStorage.getItem('FindText'), pageNumber - 1)
    .then(data => {
      const result = eventCard(data._embedded.events);
      renderList(result);
    })
    .catch(err => {
      console.log(err);
    });
}
