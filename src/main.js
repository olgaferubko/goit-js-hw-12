import { fetchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.getElementById('loader');
let lightbox;

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

form.addEventListener('submit', event => {
  event.preventDefault();

  const query = event.target.elements.searchQuery.value.trim();
  if (!query) {
    iziToast.warning({ title: 'Попередження', message: 'Будь ласка, введіть запит' });
    return;
  }

  gallery.innerHTML = '';
  showLoader(); 

  fetchImages(query)
    .then(data => {
      hideLoader();

      if (data.hits.length === 0) {
        iziToast.error({ title: 'Помилка', message: 'Нічого не знайдено' });
        return;
      }

      renderImages(data.hits);

      if (lightbox) {
        lightbox.refresh();
      } else {
        lightbox = new SimpleLightbox('.gallery a');
      }
    })
    .catch(error => {
      hideLoader(); 
      iziToast.error({ title: 'Помилка', message: 'Не вдалося завантажити зображення' });
      console.error(error);
    });
});
