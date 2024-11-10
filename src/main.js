import { fetchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.getElementById('load-more');
let query = '';
let page = 1;
let lightbox;
const perPage = 15;

form.addEventListener('submit', async event => {
  event.preventDefault();
  query = event.target.elements.searchQuery.value.trim();

  if (!query) {
    iziToast.warning({ title: 'Попередження', message: 'Будь ласка, введіть запит' });
    return;
  }

  page = 1;
  gallery.innerHTML = '';
  loadMoreButton.style.display = 'none';

  try {
    const data = await fetchImages(query, page, perPage);

    if (data.hits.length === 0) {
      iziToast.error({ title: 'Помилка', message: 'Нічого не знайдено' });
      return;
    }

    renderImages(data.hits);
    loadMoreButton.style.display = 'block';
    initializeLightbox();

    if (page * perPage >= data.totalHits) {
      loadMoreButton.style.display = 'none';
      iziToast.info({ title: 'Інформація', message: "We're sorry, but you've reached the end of search results." });
    }
  } catch (error) {
    iziToast.error({ title: 'Помилка', message: 'Не вдалося завантажити зображення' });
  }
});

loadMoreButton.addEventListener('click', async () => {
  page += 1;

  try {
    const data = await fetchImages(query, page, perPage);
    renderImages(data.hits);

    if (lightbox) {
      lightbox.refresh();
    }

    if (page * perPage >= data.totalHits) {
      loadMoreButton.style.display = 'none';
      iziToast.info({ title: 'Інформація', message: "We're sorry, but you've reached the end of search results." });
    }
    
    smoothScroll();
  } catch (error) {
    iziToast.error({ title: 'Помилка', message: 'Не вдалося завантажити зображення' });
  }
});

function initializeLightbox() {
  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery a');
  }
}

function smoothScroll() {
  const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}