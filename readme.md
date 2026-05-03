# MiColonia.com - Sprint 3

## 1. Información del Proyecto y Grupo
* **Nombre del Proyecto:** MiColonia.com
* **Componentes del Grupo:**
    * Daniel Peña Méndez
    * Crisamer Ortega González
    * Juan López Ramírez
* **Asignatura:** Programación Web y Móvil
* **Tablero de Trello:** [https://trello.com/b/ibtOBRiX/pwm-micolonia](https://trello.com/b/ibtOBRiX/pwm-micolonia)

---

## 2. Descripción del Proyecto
El sitio *“MiColonia.com”* ha sido completamente refactorizado a **Angular** para ofrecer una experiencia de usuario moderna y escalable. Ahora, el contenido dinámico se gestiona a través de **Firebase Firestore** como base de datos en la nube, y la autenticación de usuarios se realiza con **Firebase Authentication**. El diseño responsivo se mantiene para adaptarse a distintos dispositivos.

---

## 3. Listado de Requisitos Funcionales
* **RF-01:** Registro y autenticación de usuarios mediante Firebase Authentication.
* **RF-02:** Carga dinámica de fragancias y notas olfativas desde Firebase Firestore.
* **RF-03:** Búsqueda de fragancias y notas olfativas.
* **RF-04:** Visualización detallada de fragancias con sus notas clasificadas.
* **RF-05:** Gestión de colección personal y notas favoritas para usuarios autenticados, almacenadas en Firebase Firestore.
* **RF-06:** Laboratorio dinámico para la creación de fragancias mediante Drag and Drop (funcionalidad a migrar/implementar en Angular).
* **RF-07:** Filtrado dinámico de fragancias por temporada, momento del día y género.
* **RF-08:** Diseño web adaptable (RWD) a distintos dispositivos (móvil, tablet, desktop) utilizando Flexbox.

---

## 4. Estructura del Código del Proyecto Web (Angular)
El proyecto sigue una estructura modular y basada en componentes, típica de Angular.

*   **`src/`**: Contiene el código fuente de la aplicación Angular.
    *   **`app/`**: Módulo principal de la aplicación.
        *   **`app.component.ts` / `.html` / `.css`**: Componente raíz que actúa como "shell" de la aplicación, conteniendo el layout global (header, footer y `router-outlet`).
        *   **`app.module.ts`**: Módulo principal que declara e importa los componentes y módulos de la aplicación.
        *   **`app-routing.module.ts`**: Define las rutas de navegación de la aplicación.
        *   **`components/`**: Carpeta para componentes reutilizables (ej. Header, Footer, Tarjetas de Fragancia/Nota).
        *   **`pages/`**: Carpeta para los componentes que representan páginas completas (ej. Home, Catálogo, Login).
        *   **`services/`**: Carpeta para los servicios que interactúan con la API (Firebase, JSON Server).
        *   **`models/`**: (Opcional) Definiciones de interfaces/clases para los datos (Fragancia, Nota, Usuario).
    *   **`assets/`**: Contiene recursos estáticos como imágenes, fuentes, etc.
    *   **`environments/`**: Configuración específica para entornos de desarrollo y producción (incluye credenciales de Firebase).
    *   **`styles.css`**: Estilos globales de la aplicación.

---

## 5. Estructura de los Datos en Firebase Firestore
Los datos del sitio web se almacenan en Firebase Firestore, una base de datos NoSQL basada en documentos. La estructura principal es la siguiente:

*   **Colección `fragrances`**:
    *   Cada documento representa una fragancia.
    *   **Campos:** `id` (numérico), `name` (string), `brand` (string), `image` (URL), `season` (array de strings), `time` (string), `gender` (string), `notes` (objeto con `top`, `heart`, `base` como arrays de strings).
    *   **Ejemplo de documento:**
        ```json
        {
          "id": 1,
          "name": "Acqua di Gio Profumo",
          "brand": "Giorgio Armani",
          "image": "img/fragances/acqua-di-gio-profumo.jpg",
          "season": ["Verano"],
          "time": "Día",
          "gender": "Masculino",
          "notes": {
            "top": ["Notas marinas", "Bergamota"],
            "heart": ["Romero", "Geranio"],
            "base": ["Incienso", "Pachulí"]
          }
        }
        ```

*   **Colección `notes`**:
    *   Cada documento representa una nota olfativa.
    *   **Campos:** `id` (numérico), `name` (string), `type` (string: "top", "heart", "base"), `description` (string), `image` (URL).
    *   **Ejemplo de documento:**
        ```json
        {
          "id": 1,
          "name": "Bergamota",
          "type": "top",
          "description": "Cítrico brillante y amargo...",
          "image": "img/notes/bergamot.jpg"
        }
        ```

*   **Colección `users`**:
    *   Cada documento representa un usuario. El `id` del documento es el `uid` de Firebase Authentication.
    *   **Campos:** `username` (string, email), `favoriteNotes` (array de strings con nombres de notas), `collection` (array de números con IDs de fragancias).
    *   **Ejemplo de documento:**
        ```json
        {
          "username": "admin@micolonia.com",
          "favoriteNotes": ["Vainilla", "Sándalo"],
          "collection": [1, 5, 8]
        }
        ```

---

## 6. Tour por la Página Web (Puntos Importantes)

### 6.1. Inicio y Navegación
*   **Landing Page (`/`)**: Muestra una selección de fragancias destacadas.
*   **Catálogo (`/catalogo`)**: Listado completo de fragancias con opciones de filtrado por temporada, momento del día y género.
*   **Explorador de Notas (`/notas`)**: Permite descubrir las diferentes notas olfativas.
*   **Laboratorio (`/laboratorio`)**: Herramienta interactiva para crear fragancias personalizadas.
*   **Mi Espacio (`/mi-espacio`)**: Área personal del usuario con su colección de fragancias y notas favoritas.

### 6.2. Autenticación y Perfil de Usuario
*   **Login (`/login`)**: Formulario de autenticación. Utilice las credenciales de prueba (`admin@micolonia.com` / `123456`).
*   **Funcionalidades de Usuario**: Una vez autenticado, el usuario puede:
    *   **Añadir/Quitar fragancias a su colección**: Desde la página de detalle de cada fragancia, usando el botón "💾".
    *   **Marcar/Desmarcar notas como favoritas**: Desde la página de detalle de cada nota, usando el botón "❤️".
    *   **Visualizar su colección y favoritos**: En la página `/mi-espacio`.

### 6.3. Ejemplo de Introducción de Datos y Visualización
Para demostrar la carga dinámica y la persistencia de datos:

1.  **Añadir una fragancia a la colección:**
    *   Inicie sesión con `admin@micolonia.com` / `123456`.
    *   Navegue a la página de detalle de cualquier fragancia (ej. `http://localhost:4200/fragancia/2`).
    *   Haga clic en el botón "💾" para añadirla a la colección.
    *   Verifique que el botón cambia de estado.
    *   Navegue a `/mi-espacio`. La fragancia recién añadida debería aparecer en "Mi Colección".

2.  **Marcar una nota como favorita:**
    *   Asegúrese de estar autenticado.
    *   Navegue a la página de detalle de una nota (ej. `http://localhost:4200/nota/Bergamota`).
    *   Haga clic en el botón "❤️" para marcarla como favorita.
    *   Verifique que el botón cambia de estado.
    *   Navegue a `/mi-espacio`. La nota debería aparecer en "Notas Favoritas".

---

## 7. Configuración de Firebase
El proyecto utiliza Firebase para la base de datos (Firestore) y la autenticación (Authentication).

### Pasos para configurar Firebase (si no está ya configurado):
1.  Crea un proyecto en [Firebase Console](https://console.firebase.google.com/).
2.  Habilita **Firestore Database** y **Authentication** (con proveedor de Email/Contraseña).
3.  Copia tus credenciales de configuración de Firebase (API Key, Auth Domain, Project ID, etc.).
4.  Crea el archivo `src/environments/environment.ts` (y `environment.prod.ts`) y pega tus credenciales:
    ```typescript
    export const environment = {
      production: false,
      firebase: {
        apiKey: "TU_API_KEY",
        authDomain: "TU_AUTH_DOMAIN",
        projectId: "TU_PROJECT_ID",
        storageBucket: "TU_STORAGE_BUCKET",
        messagingSenderId: "TU_MESSAGING_SENDER_ID",
        appId: "TU_APP_ID"
      }
    };
    ```
5.  Importa tus datos iniciales (`db.json`) a Firestore. Puedes usar un script o la interfaz de Firebase.

---

## 8. Cómo Ejecutar el Proyecto

Este proyecto requiere **`json-server`** (para simular la API de datos inicial) y **Angular CLI** para el desarrollo.

1.  **Instalar Dependencias:**
    Abre una terminal en la **raíz del proyecto** y ejecuta:
    ```bash
    npm install
    ```
    *(Esto instalará Angular, `json-server`, `concurrently` y otras dependencias.)*

2.  **Iniciar Servidores:**
    **Desde la carpeta `frontend`**, ejecuta el comando principal:
    ```bash
    npm start
    ```
    *(Este comando iniciará automáticamente `json-server` en `http://localhost:3000` y el servidor de desarrollo de Angular en `http://localhost:4200`.)*

3.  **Acceder a la Aplicación:**
    Abre tu navegador web (preferiblemente Google Chrome o Microsoft Edge) y navega a:
    ```
    http://localhost:4200
    ```

---
