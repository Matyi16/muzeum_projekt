
const instrumentList = document.getElementById('instrumentList');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.tag-btn');
const noResults = document.getElementById('noResults');

let instruments = [];
let activeFilter = 'all';

async function loadData() {
    const res = await fetch('assets/js/content.json?t=' + new Date().getTime());
    instruments = await res.json();
    render(instruments);
}

loadData();

function render(data) {
    instrumentList.innerHTML = '';
    data.forEach((item, index) => {
        instrumentList.insertAdjacentHTML('beforeend', `
  <div class="instrument-item"
     onclick="showDetails(${item.id})"
     style="animation-delay: ${index * 30}ms">
    <div class="instrument-id">${item.id}.</div>
    <div class="instrument-details">
      <span class="category-badge">${item.badge}</span>
      <div class="instrument-title">${item.title}</div>
      ${item.meta ? `<div class="instrument-meta">${item.meta}</div>` : ''}
    </div>
   </div>`);
    });
}

function filterData() {
    const q = searchInput.value.toLowerCase();
    const filtered = instruments.filter(item => {
        const text = `${item.title} ${item.meta} ${item.badge}`.toLowerCase();
        return text.includes(q) &&
            (activeFilter === 'all' || item.category === activeFilter);
    });
    render(filtered);
    noResults.style.display = filtered.length ? 'none' : 'block';
}

searchInput.addEventListener('input', filterData);

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.dataset.filter;
        filterData();
    });
});
function showDetails(id) {

    const item = instruments.find(
        i => i.id === id
    );

    document.getElementById('modalTitle')
        .textContent = item.title;

    document.getElementById('modalImage')
        .src = item.image;

    document.getElementById('modalManufacturer')
        .textContent = item.manufacturer || '-';

    document.getElementById('modalYear')
        .textContent = item.year || '-';

    document.getElementById('modalCategory')
        .textContent = item.badge || '-';

    document.getElementById('modalLocation')
        .textContent = item.location || '-';

    document.getElementById('modalDescription')
        .textContent = item.description || '';

    const modal = document.getElementById('instrumentModal');
    modal.style.display = 'flex';
    // Force reflow
    modal.offsetHeight;
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('instrumentModal');
    modal.classList.remove('active');
    setTimeout(() => {
        // Prevent setting display to none if the modal was reopened quickly
        if (!modal.classList.contains('active')) {
            modal.style.display = 'none';
        }
    }, 400);
}

document.querySelector('.close-btn')
    .addEventListener('click', closeModal);

window.addEventListener('click', e => {
    if (e.target.id === 'instrumentModal') {
        closeModal();
    }
});
loadData();
