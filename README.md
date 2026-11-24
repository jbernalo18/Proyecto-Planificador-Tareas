# Ládora · Planificador de tareas

Un gestor de tareas común muestra todo junto y termina abrumando.
Ládora organiza el trabajo en columnas según su avance y urgencia,
con prioridad y etiquetas de colores por tarjeta. Las columnas son
adaptables, por ejemplo, para trabajar con SCRUM.

Inspiración visual: la piedra labradorita.

## Demo

**En línea:** https://jbernalo18.github.io/Proyecto-Planificador-Tareas/Front/formulario.html

## Funcionalidades

- Crear tarjetas de tarea con nombre, descripción, fecha de entrega,
  responsable y prioridad (alta, media o baja).
- Organizar las tareas por estado: Por hacer, En proceso, En revisión y Hecho.
- Editar y eliminar tareas, y marcarlas como hechas con un clic.
- Agregar etiquetas de colores a cada tarea.
- Asignar una tarea a un responsable.
- Validación del formulario antes de guardar (la fecha de entrega
  no puede ser anterior a hoy).
- Identificadores únicos: el gestor asigna cada id y nunca se repite,
  aunque se borren tareas.
- Persistencia en el navegador: las tareas siguen ahí al recargar la página.

## Tecnologías

| Área | Herramienta |
|------|-------------|
| Interfaz | HTML5, CSS3 |
| Lógica | JavaScript (módulos ES) |
| Almacenamiento | localStorage (Web Storage API) |
| Pruebas | Jest, jest-environment-jsdom |
| Control de versiones | Git y GitHub |
| Gestión del proyecto | SCRUM con GitHub Projects |

## Estructura del proyecto

```
Proyecto-Ladora/
├── assets/
│   ├── iconos/
│   └── imagenes/
├── Front/
│   ├── CSS/
│   │   ├── formulario.css
│   │   ├── header.css
│   │   └── styles.css
│   ├── JS/
│   │   ├── dom.js            # pinta tarjetas y columnas
│   │   ├── main.js           # eventos y conexión entre módulos
│   │   ├── project.js        # clase Proyecto (nombre, color, nombres de listas)
│   │   ├── taskManager.js    # clase TaskManager (lógica y persistencia)
│   │   └── validaciones.js   # reglas del formulario
│   ├── test/
│   │   ├── dom.test.js
│   │   └── taskManager.test.js
│   ├── formulario.html
│   └── index.html
├── package.json
└── README.md
```

## Cómo ejecutarlo en local

1. Clona el repositorio.
2. Abre la carpeta en VS Code.
3. Con la extensión Live Server, abre `Front/formulario.html`.

> Las tareas se guardan en el localStorage de cada navegador, así que
> la versión en línea y la local no comparten datos.

## Pruebas

```
npm install
npm test
```

| Qué se prueba | Archivo |
|---------------|---------|
| `TaskManager`: agregar, eliminar, editar y asignar una tarea | `taskManager.test.js` |
| Interfaz: al agregar una tarea aparece en su columna y al eliminarla desaparece | `dom.test.js` |

Las pruebas de interfaz usan jsdom para simular el navegador.

## Decisiones de diseño

- **Separación de responsabilidades:** `TaskManager` maneja los datos,
  `dom.js` solo dibuja y `main.js` conecta los eventos.
- **Persistencia consistente:** cada cambio (agregar, editar, eliminar
  o completar) guarda las tareas en localStorage.
- **Contador de ids guardado aparte** (`ultimoId`): evita reutilizar ids
  de tareas eliminadas después de recargar la página.
- **Renderizado desde los datos:** las columnas se vuelven a pintar a
  partir de la lista de tareas, así la pantalla siempre refleja el
  estado real.

## Autora

Juliana Bernal · [@jbernalo18](https://github.com/jbernalo18)
