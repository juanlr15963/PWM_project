# MiColonia.com - Sprint 1

## 1. Información del Proyecto y Grupo
* **Nombre del Proyecto:** MiColonia.com
* **Componentes del Grupo:**
    * Daniel Peña Méndez
    * Crisamer Ortega González
    * Juan López Ramírez
* **Asignatura:** Programación Web y Móvil

---

## 2. Descripción del Proyecto
El sitio *“MiColonia.com”* es una web diseñada para los amantes de los aromas, indicada para aquellos que quieran dar matices aromáticos con personalidad. El sitio ofrecerá perfumes seleccionados según la estación del año y el gusto de los usuarios, además, la propia web recomendará combinaciones personalizadas según las notas preferidas del cliente.


---

## 3. Listado de Requisitos Funcionales
* **RF-01:** En usuario podrá registrarse e iniciar sesión en el sistema para acceder a funcionalidades exclusivas (favoritos, creación de fragancias, recomendaciones).
* **RF-02:** El usuario podrá buscar colonias por nombre, marca o categorías.
* **RF-03:** El sistema mostrará notas olfativas y descripción de cada colonia.
* **RF-04:** Un usuario registrado podrá marcar colonias como favoritas, visualizarlas en una colección y eliminarlas de este listado de favoritos.
* **RF-05:** El usuario puede combinar ingredientes y visualizar cómo afectan al resultado final de una fragancia. También podrá nombrar a la colonia que ha creado, siendo accesible por otros usuarios (RF-02) con posibilidad a marcarla como favorita (RF-03). Un perfume creado es inmutable.
* **RF-06:** En base a la información disponible del usuario, el sistema recomienda fragancias que podrían ser del gusto del usuario.
* **RF-07:** Un usuario registrado podrá marcar notas olfativas como favoritas para refinar las recomendaciones del sistema (RF-06).
* **RF-08:** El sistema ofrece un catálogo con todas las notas olfativas disponibles, accesible para cualquier usuario.
* **RF-09:** El sistema mostrará una página de inicio con fragancias destacadas y de temporada, además de acceso a las principales funcionalidades de la plataforma.

---

## 4. Diseño y Prototipado (Mockups)
* **Nombre del archivo:** `Mockups.pdf`
* **Descripción:** Este archivo contiene los esquemas visuales (mockups) que definen el flujo de navegación del usuario.

---

## 5. Implementación de Páginas HTML
A continuación se listan los archivos HTML desarrollados y el mockup que representan:

| Archivo HTML       | Mockup que implementa        | Descripción                                                                           |
|:-------------------|:-----------------------------|:--------------------------------------------------------------------------------------|
| `index.html`       | **Landig page**              | Página de inicio de la aplicación.                                                    |
| `catalogo.html`    | **Explorador de fragancias** | Galería con perfumes disponibles.                                                     |
| `laboratorio.html` | **Creador de fragancias**    | Herramienta dinámica para crear colonias.                                             |
| `busqueda.html`    | **Vista de búsqueda**        | Filtro optimizado para buscar fragancias específicas mediantes palabras clave y notas |
| `fragancia.html`   | **Catálogo de fragancia**    | Vista detallada de una fragancia.                                                     |
| `login.html`       | **Login**                    | Formulario de autenticación y registro para acceder al área personalizda.             |
| `mi-espacio.html`  | **Colección de usuario**     | Panel personal donde el usuario puede gestionar sus creaciones y fragancias favoritas |
| `nota.html`        | **Ficha nota olfativa**      | Información sobre una nota específica.                                                |
| `notas.html`       | **Catálogo notas olfativas** | Catálogo con notas olfátivas.                                                         |

---

## 6. Implementación de Templates
A continuación se listan los templates y componentes reutilizables desarrollados:

| Archivo                           | Tipo       | Descripción                                                                                          |
|:----------------------------------|:-----------|:-----------------------------------------------------------------------------------------------------|
| `components/navbar.html`          | Componente | Barra de navegación principal con logo, buscador y enlaces a secciones clave de la aplicación.       |
| `components/footer.html`          | Componente | Pie de página con logo, enlaces de navegación y sección de soporte.                                  |
| `components/auth-form.html`       | Componente | Formulario de autenticación reutilizable con campos de email y contraseña.                           |
| `components/fragrance-card-template.html` | Template   | Plantilla de tarjeta para mostrar fragancias con imagen, nombre y descripción mediante placeholders. |
| `components/note-card-template.html` | Template   | Plantilla de tarjeta para mostrar notas olfativas con nombre, descripción e icono.                   |
| `fragancia.html` (líneas 16-31)   | Template   | Sección dinámica de ficha de fragancia que se rellena mediante JavaScript con parámetros de URL.     |

---

## 7. Estructura del Repositorio

```
PWM_project/
├── Codigo/                          # Código fuente de la aplicación
│   ├── components/                  # Componentes y templates reutilizables
│   ├── css/                         # Hojas de estilo
│   ├── js/                          # Scripts JavaScript
│   └── ... (resto de archivos HTML, etc.)
├── node_modules/                    # Dependencias del proyecto (generado por npm)
├── db.json                          # Base de datos de la aplicación
├── package.json                     # Definición del proyecto y dependencias
├── package-lock.json                # Versiones exactas de las dependencias
├── Mockups.pdf                      # Diseños y mockups de la interfaz
└── README.md                        # Documentación del proyecto
```

---

## 8. Cómo Ejecutar el Proyecto

Este proyecto utiliza **`json-server`** para simular una API REST y cargar los datos de forma dinámica. Es **imprescindible** seguir estos pasos para que la aplicación funcione correctamente.

### Requisitos Previos
* **Node.js y npm:** Debes tenerlos instalados en tu sistema. Puedes descargarlos desde [nodejs.org](https://nodejs.org/).

### Tutorial de Instalación y Ejecución

1.  **Abrir una Terminal:**
    Abre tu terminal o línea de comandos (como Git Bash, PowerShell, o el terminal integrado de tu editor de código) y navega hasta la **carpeta raíz** del proyecto (`PWM_project/`).

2.  **Instalar Dependencias:**
    Una vez en la raíz del proyecto, ejecuta el siguiente comando. Este comando leerá el archivo `package.json` y descargará `json-server` en la carpeta `node_modules/`.
    ```bash
    npm install
    ```

3.  **Iniciar el Servidor de Datos (API):**
    Ahora, inicia el servidor de la base de datos. Este comando le dice a `json-server` que "vigile" el archivo `db.json` y lo sirva en el puerto 3000.
    ```bash
    npm start
    ```
    Si todo va bien, verás un mensaje similar a este en la terminal:
    ```
    > pwm_project@1.0.0 start
    > json-server --watch db.json --port 3000

    \{^_^}/ hi!

    Loading db.json
    Done

    Resources
    http://localhost:3000/fragrances
    http://localhost:3000/notes
    http://localhost:3000/users
    http://localhost:3000/custom_designs

    Home
    http://localhost:3000

    Type s + enter at any time to create a snapshot of the database
    ```
    **¡Importante!** No cierres esta terminal. El servidor debe permanecer en ejecución para que la página web pueda pedirle los datos.

4.  **Abrir la Página Web:**
    Con el servidor ya corriendo, abre el archivo `Codigo/index.html` en tu navegador. Puedes hacerlo de varias maneras:
    *   Haciendo doble clic en el archivo desde tu explorador de archivos.
    *   Usando la función "Open in Browser" de tu editor de código.

    La aplicación se cargará y hará peticiones al servidor en `http://localhost:3000` para obtener los datos de las fragancias, notas, etc.

---
