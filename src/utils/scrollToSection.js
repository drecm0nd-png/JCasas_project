/** Desplaza verticalmente hacia una sección con velocidad lineal. */
let animacionActiva = null;

export function scrollToSection(id) {
  const destino = document.getElementById(id);
  if (!destino) return;

  if (animacionActiva !== null) {
    window.cancelAnimationFrame(animacionActiva);
    animacionActiva = null;
  }

  const margen = Number.parseFloat(
    window.getComputedStyle(destino).scrollMarginTop,
  ) || 0;
  const inicio = window.scrollY;
  const fin = Math.max(
    0,
    window.scrollY + destino.getBoundingClientRect().top - margen,
  );
  const distancia = fin - inicio;

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    Math.abs(distancia) < 2
  ) {
    window.scrollTo(0, fin);
    return;
  }

  const duracion = Math.min(1000, Math.max(300, Math.abs(distancia) * 0.45));
  let marcaInicio;

  function animar(marcaActual) {
    if (marcaInicio === undefined) marcaInicio = marcaActual;
    const progreso = Math.min((marcaActual - marcaInicio) / duracion, 1);

    window.scrollTo(0, inicio + distancia * progreso);

    if (progreso < 1) {
      animacionActiva = window.requestAnimationFrame(animar);
    } else {
      animacionActiva = null;
    }
  }

  animacionActiva = window.requestAnimationFrame(animar);
}
