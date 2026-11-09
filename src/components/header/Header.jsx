import { useEffect, useState } from "react";
import logo from "../../assets/img/logo.png";
import Boton from "../button/Button";
import { scrollToSection } from "../../utils/scrollToSection";
import "./header.css";

const links = [
  { label: "Inicio", href: "#lp-portada" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Menú", href: "#menu" },
  { label: "Horarios y ubicación", href: "#cobertura" },
  { label: "Preguntas y contacto", href: "#preguntas-contacto" },
  { label: "Registrarse", href: "#registrarse" },
];

function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [seccionActiva, setSeccionActiva] = useState(() => {
    const opcion = links.find(({ href }) => href === window.location.hash);
    return opcion?.label ?? "Inicio";
  });

  useEffect(() => {
    const actualizarSeccion = () => {
      const alturaEncabezado =
        document.querySelector(".encabezado")?.getBoundingClientRect().height ??
        0;
      const secciones = links
        .filter(({ label }) => label !== "Registrarse")
        .map((enlace) => ({
          ...enlace,
          elemento: document.getElementById(enlace.href.slice(1)),
        }))
        .filter(({ elemento }) => elemento)
        .map((enlace) => ({
          ...enlace,
          posicion: enlace.elemento.getBoundingClientRect().top,
        }))
        .filter(({ posicion }) => posicion <= alturaEncabezado + 12)
        .sort((a, b) => a.posicion - b.posicion);

      setSeccionActiva(secciones.at(-1)?.label ?? "Inicio");
    };

    actualizarSeccion();
    window.addEventListener("scroll", actualizarSeccion, { passive: true });
    window.addEventListener("resize", actualizarSeccion);
    return () => {
      window.removeEventListener("scroll", actualizarSeccion);
      window.removeEventListener("resize", actualizarSeccion);
    };
  }, []);

  function seleccionarOpcion(label) {
    setSeccionActiva(label);
    setMenuAbierto(false);
  }

  function navegarASeccion(event, href, label) {
    event.preventDefault();
    seleccionarOpcion(label);
    window.history.pushState(null, "", href);
    scrollToSection(href.slice(1));
  }

  function irARegistro() {
    seleccionarOpcion("Registrarse");
    window.location.hash = "registrarse";
  }

  return (
    <header className="encabezado" id="inicio">
      <div className="encabezado__barra">
        <a
          className="encabezado__marca"
          href="#lp-portada"
          aria-label="JC Casas Restaurante, inicio"
          onClick={(event) => navegarASeccion(event, "#lp-portada", "Inicio")}
        >
          <img className="encabezado__logo" src={logo} alt="" />
          <span className="encabezado__nombre">JC Casas Restaurante</span>
        </a>

        <button
          className={`encabezado__alternador${menuAbierto ? " encabezado__alternador--abierto" : ""}`}
          type="button"
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuAbierto}
          aria-controls="navegacion-principal"
          onClick={() => setMenuAbierto((abierto) => !abierto)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          className={`encabezado__navegacion${menuAbierto ? " encabezado__navegacion--abierta" : ""}`}
          id="navegacion-principal"
          aria-label="Navegación principal"
        >
          {links.map(({ label, href }) =>
            label === "Registrarse" ? (
              <Boton
                key={href}
                text="Registrarse"
                onClick={irARegistro}
                aria-current={seccionActiva === label ? "page" : undefined}
                className={
                  seccionActiva === label
                    ? "encabezado__registro--activo"
                    : undefined
                }
              />
            ) : (
              <a
                key={href}
                className={
                  seccionActiva === label
                    ? "encabezado__enlace--activo"
                    : undefined
                }
                href={href}
                aria-current={seccionActiva === label ? "page" : undefined}
                onClick={(event) => navegarASeccion(event, href, label)}
              >
                {label}
              </a>
            ),
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
