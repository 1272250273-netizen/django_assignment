const allTitles = window.titles;
const getTitle = id => allTitles.find(title => title.id === id);
const card = title => `<article class="poster" data-id="${title.id}" tabindex="0" role="button"><img src="${title.image}" alt="${title.title}"><div><h3>${title.title}</h3><small>${title.year} · ${title.genre}</small></div></article>`;
const modal = document.querySelector('#modal');
const savedTitles = new Set(JSON.parse(localStorage.getItem('prime-my-list') || '[]'));
let activeTitleId = '';
function updateWatchlistButton() { const button = modal.querySelector('.watchlist'); const saved = savedTitles.has(activeTitleId); button.textContent = saved ? '✓' : '＋'; button.setAttribute('aria-label', saved ? 'Remove from My List' : 'Add to My List'); button.classList.toggle('saved', saved); }
function showDetails(id) { const title = getTitle(id); if (!title) return; activeTitleId = id; modal.querySelector('.modal-image').style.backgroundImage = `url("${title.image}")`; modal.querySelector('h2').textContent = title.title; modal.querySelector('.description').textContent = title.description; modal.querySelector('.modal-meta').innerHTML = `<span>${title.year}</span><span>${title.genre}</span><span>16+</span><b>UHD</b>`; updateWatchlistButton(); modal.hidden = false; document.body.classList.add('locked'); }
function hideDetails() { modal.hidden = true; document.body.classList.remove('locked'); }
document.addEventListener('click', event => { const target = event.target.closest('[data-id]'); if (target) showDetails(target.dataset.id); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') { hideDetails(); closeSearch(); } if (event.key === 'Enter' && document.activeElement.matches('[data-id]')) showDetails(document.activeElement.dataset.id); if (event.key === '/' && document.activeElement.tagName !== 'INPUT') { event.preventDefault(); document.querySelector('#search').focus(); } });
modal.addEventListener('click', event => { if (event.target === modal || event.target.closest('.modal-close')) hideDetails(); if (event.target.closest('.watchlist')) { if (savedTitles.has(activeTitleId)) savedTitles.delete(activeTitleId); else savedTitles.add(activeTitleId); localStorage.setItem('prime-my-list', JSON.stringify([...savedTitles])); updateWatchlistButton(); } });
const search = document.querySelector('#search'); const results = document.querySelector('#results');
function searchTitles() { const query = search.value.trim().toLowerCase(); const matches = allTitles.filter(title => `${title.title} ${title.genre} ${title.type}`.toLowerCase().includes(query)); results.querySelector('.results-grid').innerHTML = matches.map(card).join(''); results.querySelector('.empty').hidden = matches.length > 0; results.hidden = false; document.body.classList.add('locked'); }
function closeSearch() { results.hidden = true; if (modal.hidden) document.body.classList.remove('locked'); }
search.addEventListener('input', searchTitles); document.querySelector('.close-search').addEventListener('click', closeSearch);
