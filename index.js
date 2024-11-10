import{i as l,S as f}from"./assets/vendor-5ObWk2rO.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const d="46848522-362871de9bc7c195a5b36e0f9",p="https://pixabay.com/api/";function m(n,o=1,t=12){const s=`${p}?key=${d}&q=${encodeURIComponent(n)}&image_type=photo&orientation=horizontal&safesearch=true&page=${o}&per_page=${t}`;return fetch(s).then(e=>{if(!e.ok)throw new Error("Не вдалося виконати запит");return e.json()})}function y(n){const o=document.querySelector(".gallery");o.innerHTML=n.map(t=>`
      <a href="${t.largeImageURL}" class="gallery__item">
        <img src="${t.webformatURL}" alt="${t.tags}" />
        <div class="info">
          <p><b>Likes:</b> ${t.likes}</p>
          <p><b>Views:</b> ${t.views}</p>
          <p><b>Comments:</b> ${t.comments}</p>
          <p><b>Downloads:</b> ${t.downloads}</p>
        </div>
      </a>
    `).join("")}const h=document.querySelector(".search-form"),g=document.querySelector(".gallery"),u=document.getElementById("loader");let c;function b(){u.style.display="block"}function a(){u.style.display="none"}h.addEventListener("submit",n=>{n.preventDefault();const o=n.target.elements.searchQuery.value.trim();if(!o){l.warning({title:"Попередження",message:"Будь ласка, введіть запит"});return}g.innerHTML="",b(),m(o).then(t=>{if(a(),t.hits.length===0){l.error({title:"Помилка",message:"Нічого не знайдено"});return}y(t.hits),c?c.refresh():c=new f(".gallery a")}).catch(t=>{a(),l.error({title:"Помилка",message:"Не вдалося завантажити зображення"}),console.error(t)})});
//# sourceMappingURL=index.js.map
