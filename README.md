# JCasas_project

Repositorio para controlar las versiones del proyecto formativo.

## Enrutamiento y navegación

### Rutas implementadas

- `/` muestra la página Landing.
- `/login` muestra la página de inicio de sesión y registro.
- El botón **Registrarse** del encabezado dirige a `/login`.

`react-router-dom` está instalado como dependencia. `src/main.jsx` monta la
aplicación dentro de `BrowserRouter`, y `src/routes/AppRoutes.jsx` declara las
rutas. El botón **Registrarse** usa navegación cliente desde el encabezado, sin
recargar el documento. Las rutas desconocidas regresan a `/`.

### Evolución propuesta

`src/routes/AppRoutes.jsx` es el punto central para declarar nuevas rutas y sus
layouts. Para extender el flujo, se podrán agregar rutas como:

| Ruta | Vista |
| --- | --- |
| `/` | Landing |
| `/login` | Inicio de sesión y registro |
| `/menu`, `/pedidos`, `/perfil` | Vistas que se podrán agregar al flujo de usuario |
| `/admin/*` | Rutas anidadas del panel administrativo cuando estén listas |

La navegación conserva la URL y el historial del navegador, incluidas las
acciones atrás/adelante. Las nuevas pantallas se incorporarán al árbol de rutas;
los layouts y guards de autenticación se podrán agregar a los grupos que los
necesiten sin trasladar la lógica de navegación a cada componente.

### Transiciones reutilizables

`src/routes/RouteTransition.jsx` y `src/routes/route-transitions.css` contienen
el wrapper reutilizable. Actualmente se aplica a `/login` y anima su entrada
durante 220 ms usando `opacity` y un desplazamiento pequeño con `transform`.
Landing no se anima porque contiene un video. La regla respeta
`prefers-reduced-motion`; la animación no bloquea la navegación.

### Pantallas pesadas y skeletons

`src/routes/AppRoutes.jsx` ya incluye `Suspense` con
`src/routes/skeletons/RouteSkeleton.jsx` como fallback, y los estilos del
skeleton están en `src/routes/skeletons/route-skeleton.css`. Las rutas actuales
son importaciones estáticas, así que este fallback se mostrará cuando una ruta
futura use `React.lazy` y tenga una carga pendiente. Conviene aplicar carga
diferida a páginas pesadas, no a Landing o registro si su contenido está
disponible de inmediato. El skeleton mantiene una estructura estable, anuncia
el estado de carga y respeta `prefers-reduced-motion`.

### Despliegue

Con React Router en modo SPA, el servidor de producción debe responder con
`index.html` para las rutas de la aplicación. Esto permite abrir o recargar
directamente `/login` y las futuras rutas sin obtener un error 404.
