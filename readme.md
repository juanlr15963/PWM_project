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
│   │   ├── navbar.html              # Barra de navegación
│   │   ├── footer.html              # Pie de página
│   │   ├── auth-form.html           # Formulario de autenticación
│   │   ├── fragrance-card-template.html  # Template de tarjeta de fragancia
│   │   └── note-card-template.html  # Template de tarjeta de nota olfativa
│   ├── css/                         # Hojas de estilo
│   │   └── styles.css               # Estilos globales de la aplicación
│   ├── js/                          # Scripts JavaScript
│   │   └── xlu-include-file.js      # Utilidad para incluir componentes HTML
│   ├── index.html                   # Página de inicio (Landing page)
│   ├── catalogo.html                # Explorador de fragancias
│   ├── laboratorio.html             # Creador de fragancias
│   ├── busqueda.html                # Vista de búsqueda
│   ├── fragancia.html               # Catálogo de fragancia (detalle)
│   ├── login.html                   # Formulario de login/registro
│   ├── mi-espacio.html              # Colección personal del usuario
│   ├── nota.html                    # Ficha de nota olfativa
│   └── notas.html                   # Catálogo de notas olfativas
├── Mockups.pdf                      # Diseños y mockups de la interfaz (requerido por la actividad)
└── README.md                        # Documentación del proyecto
```

---

## 8. Cómo Ejecutar el Proyecto

### Opción 1: Usando WebStorm

1. Abre el proyecto en WebStorm.
2. Navega hasta el archivo `Codigo/index.html` en el explorador de archivos.
3. Haz clic derecho sobre `index.html` y selecciona una de las siguientes opciones:
   - **"Open in Browser"** (Abrir en navegador)
   - **"Run 'index.html'"** (Ejecutar 'index.html')
4. WebStorm iniciará automáticamente un servidor local y abrirá la aplicación en tu navegador predeterminado.

### Opción 2: Usando un Servidor Python (Alternativa)

Si la opción anterior no funciona o prefieres usar un servidor local diferente:

1. Abre una terminal o línea de comandos.
2. Navega hasta el directorio `Codigo`:
   ```bash
   cd ruta/al/proyecto/PWM_project/Codigo
   ```
3. Inicia un servidor HTTP con Python:
   - **Para Python 3:**
     ```bash
     python -m http.server 8000
     ```
   - **Para Python 2:**
     ```bash
     python -m SimpleHTTPServer 8000
     
     ```
4. Abre tu navegador web y accede a:
   ```
   http://localhost:8000
   ```
5. La aplicación debería cargarse correctamente mostrando la página de inicio.

**Nota:** Asegúrate de estar dentro del directorio `Codigo` antes de ejecutar el servidor, ya que este es el directorio raíz de la aplicación web.

---
