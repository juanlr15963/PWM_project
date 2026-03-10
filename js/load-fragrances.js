document.addEventListener("DOMContentLoaded", async () => {

  const fragranceGrid = document.getElementById("fragrance-grid");

  try {

    // Petición a la API de json-server
    const response = await fetch("http://localhost:3000/fragrances");

    if (!response.ok) {
      throw new Error("Error al obtener las fragancias");
    }

    const fragrances = await response.json();

    // Si no hay fragancias
    if (fragrances.length === 0) {
      fragranceGrid.innerHTML = "<p>No hay fragancias disponibles.</p>";
      return;
    }

    // Generar tarjetas
    const cardsHTML = fragrances.map(fragrance => `
      <div class="card">
        <img src="${fragrance.image}" alt="${fragrance.name}" class="card-img">

        <div class="card-body">
          <h3 class="card-title">${fragrance.name}</h3>
          <p class="card-subtitle">${fragrance.brand}</p>
        </div>
      </div>
    `).join("");

    // Insertar en el DOM
    fragranceGrid.innerHTML = cardsHTML;

  } catch (error) {

    console.error("Error cargando fragancias:", error);

    fragranceGrid.innerHTML = `
      <p>Error al cargar las fragancias.</p>
    `;

  }

});
