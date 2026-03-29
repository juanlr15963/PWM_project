# MiColonia.com - Sprint 2

## 1. Información del Proyecto y Grupo
* **Nombre del Proyecto:** MiColonia.com
* **Componentes del Grupo:**
    * Daniel Peña Méndez
    * Crisamer Ortega González
    * Juan López Ramírez
* **Asignatura:** Programación Web y Móvil

---

## 2. Descripción del Proyecto
El sitio *“MiColonia.com”* es una web diseñada para los amantes de los aromas, indicada para aquellos que quieran dar matices aromáticos con personalidad. El sitio ofrece una experiencia dinámica para explorar fragancias y notas olfativas, permitiendo a los usuarios gestionar su colección personal y favoritos.


**Sprint 2:** referente a este sprint, los mockups pueden encontrarse en la raiz del proyecto, archivo **Mockups_Sprint2.pdf**

---

## 3. Listado de Requisitos Funcionales
* **RF-01:** Registro e inicio de sesión de usuarios para acceso a funcionalidades exclusivas.
* **RF-02:** Búsqueda dinámica de fragancias por nombre o marca y de notas olfativas.
* **RF-03:** Visualización dinámica de notas olfativas y descripción clasificada de cada colonia.
* **RF-04:** Gestión de favoritos (notas) y colección personal (perfumes) para usuarios autenticados.
* **RF-05:** Laboratorio dinámico para la creación de fragancias mediante Drag and Drop.
* **RF-06:** Filtrado dinámico de fragancias por temporada, momento del día y género.
* **RF-07:** Visualización de perfumes sugeridos basados en una nota olfativa específica.

---

## 4. Estructura y Carga de Contenido
A continuación se detalla el funcionamiento técnico de cada página:

| Página HTML | Carga Templates | Carga JSON | Descripción |
|:---|:---:|:---:|:---|
| `index.html` | Sí | Sí | **Página de inicio.** Carga fragancias destacadas dinámicamente. |
| `catalogo.html` | Sí | Sí | Listado completo con filtros dinámicos (temporada, género, tiempo). |
| `fragancia.html`| Sí | Sí | Ficha detallada con notas clasificadas y gestión de colección personal. |
| `notas.html` | Sí | Sí | Catálogo dinámico de todos los ingredientes (notas). |
| `nota.html` | Sí | Sí | Detalle de nota con gestión de favoritos y perfumes sugeridos. |
| `busqueda.html` | Sí | Sí | Resultados dinámicos de búsqueda para fragancias y notas. |
| `laboratorio.html`| Sí | Sí | Herramienta Drag & Drop con carga dinámica de notas disponibles. |
| `mi-espacio.html` | Sí | Sí | Perfil de usuario con carga dinámica de su colección y notas favoritas. |
| `login.html` | Sí | No | Formulario de acceso al sistema. |

---

## 5. Formularios y Validaciones
La aplicación incluye formularios con las siguientes validaciones implementadas:

### Formulario de Login (`login.html`)
* **Email:** Atributo `required` y validación de formato mediante Regex en JS.
* **Contraseña:** Atributo `required` y longitud mínima de 6 caracteres.

### Formulario de Búsqueda (Navbar)
* **Campo de consulta:** Atributo `required` y longitud mínima de 2 caracteres.

---

## 6. Datos de Prueba
Para evaluar las funcionalidades de usuario (Mi Espacio, Colección, Notas Favoritas), utilice las siguientes credenciales:

* **Usuario:** `admin@micolonia.com`
* **Contraseña:** `123456`

---

## 7. Ubicación del Contenido (JSON Server)
El contenido dinámico de la aplicación se gestiona a través de un servidor simulado:

* **Archivo de datos:** `db.json` (ubicado en la raíz del proyecto).
* **Servidor:** JSON-Server escuchando en `http://localhost:3000`.

---

## 8. Cómo Ejecutar el Proyecto

Este proyecto requiere **`json-server`** para funcionar.

1. **Instalar Dependencias:** Ejecute `npm install` en la raíz del proyecto.
2. **Iniciar Servidor:** Ejecute `npm start`.
3. **Acceder a la Web:** Abra **`Codigo/index.html`** en un navegador moderno (Chrome, Edge o Firefox).

> ### ⚠️ NOTA IMPORTANTE SOBRE NAVEGADORES
> Para una experiencia de usuario óptima y para garantizar que todas las funcionalidades (como el inicio de sesión, el menú hamburguesa y los botones de favoritos) funcionen correctamente, **se recomienda encarecidamente utilizar Google Chrome, Microsoft Edge o Firefox**.
> 
> Debido a las restricciones de seguridad modernas en la carga de archivos locales (`file://`), el uso de navegadores obsoletos como Internet Explorer puede causar bloqueos en los scripts de carga de plantillas o errores de renderizado aleatorios.
