const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('search-results');
let allFragrances = [];
let allNotes = [];

if (searchForm && searchInput && resultsContainer) {

    // Cargar todos los datos al inicio
    const fragrancesRequest = fetch('http://localhost:3000/fragrances').then(res => res.json());
    const notesRequest = fetch('http://localhost:3000/notes').then(res => res.json());

    Promise.all([fragrancesRequest, notesRequest])
        .then(([fragrances, notes]) => {
            allFragrances = fragrances;
            allNotes = notes;
        })
        .catch(error => console.error('Error al precargar datos para búsqueda:', error));

    // Prevenir que el formulario se envíe y recargue la página
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
    });

    searchInput.addEventListener('input', function() {
        const query = searchInput.value.trim().toLowerCase();

        if (query.length < 2) {
            resultsContainer.classList.remove('visible');
            resultsContainer.innerHTML = '';
            return;
        }

        // Filtrar fragancias localmente
        const filteredFragrances = allFragrances.filter(f => 
            f.name.toLowerCase().includes(query) || 
            f.brand.toLowerCase().includes(query)
        );

        // Filtrar notas localmente
        const filteredNotes = allNotes.filter(n => 
            n.name.toLowerCase().includes(query)
        );

        resultsContainer.innerHTML = '';

        if (filteredFragrances.length === 0 && filteredNotes.length === 0) {
            resultsContainer.innerHTML = '<div class="search-result-item">No se encontraron resultados</div>';
        } else {
            filteredFragrances.forEach(fragrance => {
                const item = createResultItem(
                    fragrance.name,
                    fragrance.brand,
                    fragrance.image,
                    `fragancia.html?id=${fragrance.id}`,
                    'Fragancia'
                );
                resultsContainer.appendChild(item);
            });

            filteredNotes.forEach(note => {
                const item = createResultItem(
                    note.name,
                    'Nota Olfativa',
                    note.image,
                    `nota.html?name=${encodeURIComponent(note.name)}`
                );
                resultsContainer.appendChild(item);
            });
        }
        resultsContainer.classList.add('visible');
    });

    function createResultItem(name, subtext, image, link, label) {
        const a = document.createElement('a');
        a.href = link;
        a.className = 'search-result-item';

        const img = document.createElement('img');
        img.src = image || 'img/notes/default.jpg';
        img.className = 'search-result-item__image';

        const info = document.createElement('div');
        info.className = 'search-result-item__info';

        const nameSpan = document.createElement('span');
        nameSpan.className = 'search-result-item__name';
        nameSpan.textContent = name;

        const typeSpan = document.createElement('span');
        typeSpan.className = 'search-result-item__type';
        typeSpan.textContent = subtext ? `${label} — ${subtext}` : label;

        info.appendChild(nameSpan);
        info.appendChild(typeSpan);
        a.appendChild(img);
        a.appendChild(info);

        return a;
    }

    // Cerrar resultados al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
            resultsContainer.classList.remove('visible');
        }
    });
}
