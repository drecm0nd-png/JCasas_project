import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  FaArrowDown,
  FaArrowUp,
  FaCheck,
  FaClock,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import { FaBowlRice, FaCarrot, FaDrumstickBite, FaPlus } from "react-icons/fa6";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Button from "../../components/button/Button";
import { scrollToSection } from "../../utils/scrollToSection";
import "./landing.css";

const categorias = [
  {
    numero: "01",
    titulo: "Principio",
    descripcion: "La base del corrientazo, preparada desde temprano.",
    opciones: ["Fríjoles", "Lentejas", "Garbanzos", "Arveja"],
    Icono: FaBowlRice,
  },
  {
    numero: "02",
    titulo: "Proteína",
    descripcion: "Opciones del día preparadas con sazón casera.",
    opciones: ["Pollo", "Carne", "Cerdo", "Pescado"],
    Icono: FaDrumstickBite,
  },
  {
    numero: "03",
    titulo: "Acompañamiento",
    descripcion: "Lo que completa el plato y lo hace sentir como en casa.",
    opciones: ["Arroz", "Maduro", "Papa", "Ensalada"],
    Icono: FaCarrot,
  },
  {
    numero: "04",
    titulo: "Adicionales",
    descripcion: "Dale un extra a tu almuerzo.",
    opciones: ["Huevo", "Porción extra", "Aguacate"],
    opcional: true,
    Icono: FaPlus,
  },
];

const preguntas = [
  [
    "¿Qué trae el almuerzo?",
    "Un principio, una proteína y un acompañamiento. También puedes agregar adicionales.",
  ],
  [
    "¿El menú es el mismo todos los días?",
    "No, las opciones cambian según los ingredientes frescos disponibles.",
  ],
  [
    "¿Cuáles son los medios de pago?",
    "Puedes consultar los medios de pago disponibles al realizar tu pedido.",
  ],
  [
    "¿Tienen servicio a domicilio?",
    "Sí, consulta la cobertura y disponibilidad por teléfono o WhatsApp.",
  ],
];

function Landing() {
  const landingRef = useRef(null);
  const [preguntaAbierta, setPreguntaAbierta] = useState(0);
  const [mostrarVolverArriba, setMostrarVolverArriba] = useState(false);

  useEffect(() => {
    const apartadoPreguntas = document.getElementById("preguntas-contacto");
    if (!apartadoPreguntas) return;

    const actualizarVisibilidad = () => {
      setMostrarVolverArriba(
        apartadoPreguntas.getBoundingClientRect().top <= window.innerHeight,
      );
    };

    actualizarVisibilidad();
    window.addEventListener("scroll", actualizarVisibilidad, { passive: true });
    window.addEventListener("resize", actualizarVisibilidad);
    return () => {
      window.removeEventListener("scroll", actualizarVisibilidad);
      window.removeEventListener("resize", actualizarVisibilidad);
    };
  }, []);

  useLayoutEffect(() => {
    const raiz = landingRef.current;
    if (
      !raiz ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    if (!("IntersectionObserver" in window)) return;

    raiz.setAttribute("data-animar", "true");
    const elementos = raiz.querySelectorAll(
      ".lp-portada__texto, .lp-portada__visual, .lp-cifras__item, " +
        "#menu .lp-seccion__cabecera, #menu .lp-categoria, #menu .lp-desayunos, " +
        ".lp-nosotros__visual, .lp-nosotros__texto, " +
        "#cobertura .lp-seccion__cabecera, #cobertura .lp-info, #cobertura .lp-mapa",
    );
    elementos.forEach((elemento) => elemento.classList.add("lp-revelar"));
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return;
          entrada.target.classList.add("es-visible");
          observador.unobserve(entrada.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );

    elementos.forEach((elemento) => observador.observe(elemento));
    return () => observador.disconnect();
  }, []);

  return (
    <div className="lp" ref={landingRef}>
      <a href="#contenido" className="lp-saltar">
        Saltar al contenido
      </a>
      <Header />

      <main id="contenido">
        <section
          className="lp-portada"
          id="lp-portada"
          aria-labelledby="titulo-portada"
        >
          <div className="contenedor lp-portada__grid">
            <div className="lp-portada__texto">
              <p className="lp-etiqueta">
                <span className="lp-etiqueta__punto" aria-hidden="true" />{" "}
                Comida casera en Prado Vegas, Soacha
              </p>
              <h1 id="titulo-portada" className="lp-portada__titulo">
                El almuerzo de casa, <em>hecho para ti.</em>
              </h1>
              <p className="lp-portada__descripcion">
                Disfruta desayunos y almuerzos preparados con dedicación. Conoce
                nuestras opciones y arma tu plato con el sabor de casa.
              </p>
              <div className="lp-portada__acciones">
                <Button
                  text="Conoce el menú"
                  onClick={() => scrollToSection("menu")}
                  className="lp-boton lp-boton--primario lp-boton--grande"
                />
                <a
                  href="#cobertura"
                  className="lp-boton lp-boton--secundario lp-boton--grande"
                >
                  Cómo llegar <FaArrowDown aria-hidden="true" />
                </a>
              </div>
              <ul className="lp-portada__confianza">
                <li>
                  <FaClock aria-hidden="true" /> Atención en horario del
                  restaurante
                </li>
                <li>
                  <FaMapMarkerAlt aria-hidden="true" /> Prado Vegas, Soacha
                </li>
              </ul>
            </div>
            <div
              className="lp-portada__visual"
              aria-label="Espacio reservado para fotografía de un almuerzo"
            >
              {/* Espacio reservado: agregar aquí la fotografía principal del almuerzo. */}
              <div className="lp-portada__imagen lp-imagen-pendiente">
                <span>Fotografía del menú</span>
              </div>
              <div className="lp-flotante lp-flotante--estado">
                <div className="lp-estado">
                  <span className="lp-estado__punto" aria-hidden="true" />
                  <div>
                    <strong>Menú casero</strong>
                    <span>Preparado cada día</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="lp-cifras" aria-label="Nuestra experiencia">
          <div className="contenedor">
            <ul className="lp-cifras__lista">
              <li className="lp-cifras__item">
                <strong>20+</strong>
                <span>años de experiencia</span>
              </li>
              <li className="lp-cifras__item">
                <strong>Casero</strong>
                <span>sabor hecho en casa</span>
              </li>
              <li className="lp-cifras__item">
                <strong>Soacha</strong>
                <span>somos parte del barrio</span>
              </li>
            </ul>
          </div>
        </section>

        <section id="nosotros" className="lp-seccion">
          <div className="contenedor lp-nosotros">
            <figure className="lp-nosotros__visual">
              {/* Espacio reservado: agregar aquí una fotografía del restaurante o su cocina. */}
              <div className="lp-nosotros__imagen lp-imagen-pendiente">
                <span>Fotografía del restaurante</span>
              </div>
              <figcaption className="lp-nosotros__sello">
                <strong>20+</strong>
                <span>años de experiencia</span>
              </figcaption>
            </figure>
            <div className="lp-nosotros__texto">
              <header className="lp-seccion__cabecera lp-seccion__cabecera--izquierda">
                <p className="lp-seccion__antetitulo">Nosotros</p>
                <h2 className="lp-seccion__titulo">
                  El sabor de casa, en cada plato
                </h2>
              </header>
              <p>
                En JC Casas Restaurante preparamos desayunos y almuerzos con
                dedicación, buscando que cada visita y cada plato se sientan
                como comer en casa.
              </p>
              <ul className="lp-valores">
                <li className="lp-valor">
                  <span className="lp-valor__icono">
                    <FaCheck aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="lp-valor__titulo">Sazón de casa</h3>
                    <p>Comida cotidiana preparada con cariño.</p>
                  </div>
                </li>
                <li className="lp-valor">
                  <span className="lp-valor__icono">
                    <FaCheck aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="lp-valor__titulo">Del barrio</h3>
                    <p>Un restaurante cercano a nuestra comunidad.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="menu" className="lp-seccion lp-seccion--superficie">
          <div className="contenedor">
            <header className="lp-seccion__cabecera">
              <p className="lp-seccion__antetitulo">Partes del almuerzo</p>
              <h2 className="lp-seccion__titulo">Arma tu plato a tu gusto</h2>
              <p className="lp-seccion__descripcion">
                Explora las opciones que componen un almuerzo casero. El menú
                puede variar según la disponibilidad del día.
              </p>
            </header>
            <ol className="lp-categorias">
              {categorias.map((categoria) => {
                const IconoCategoria = categoria.Icono;
                return (
                  <li className="lp-categoria" key={categoria.numero}>
                    <div className="lp-categoria__cabecera">
                      <span className="lp-categoria__icono" aria-hidden="true">
                        <IconoCategoria />
                      </span>
                      <span className="lp-categoria__numero">
                        {categoria.numero}
                      </span>
                    </div>
                    <h3 className="lp-categoria__titulo">
                      {categoria.titulo}
                      {categoria.opcional && (
                        <span className="lp-chip-opcional">Opcional</span>
                      )}
                    </h3>
                    <p className="lp-categoria__descripcion">
                      {categoria.descripcion}
                    </p>
                    <ul className="lp-categoria__ejemplos">
                      {categoria.opciones.map((opcion) => (
                        <li key={opcion}>{opcion}</li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ol>
            <article className="lp-desayunos">
              {/* Espacio reservado: agregar aquí una fotografía de los desayunos. */}
              <div className="lp-desayunos__imagen lp-imagen-pendiente">
                <span>Fotografía de desayunos</span>
              </div>
              <div className="lp-desayunos__texto">
                <p className="lp-seccion__antetitulo">También tenemos</p>
                <h3 className="lp-desayunos__titulo">
                  Desayunos para empezar el día
                </h3>
                <p>
                  Pregunta por las opciones disponibles y disfruta un desayuno
                  preparado con sazón casera.
                </p>
                <a
                  className="lp-boton lp-boton--secundario"
                  href="tel:+573144513235"
                >
                  <FaPhone aria-hidden="true" /> Consultar por teléfono
                </a>
              </div>
            </article>
          </div>
        </section>

        <section id="cobertura" className="lp-seccion lp-seccion--superficie">
          <div className="contenedor">
            <header className="lp-seccion__cabecera">
              <p className="lp-seccion__antetitulo">Visítanos</p>
              <h2 className="lp-seccion__titulo">Estamos en Prado Vegas</h2>
              <p className="lp-seccion__descripcion">
                Consulta nuestros horarios y ubicación antes de visitarnos.
              </p>
            </header>
            <div className="lp-cobertura">
              <div className="lp-cobertura__tarjetas">
                <article className="lp-info">
                  <FaClock className="lp-info__icono" aria-hidden="true" />
                  <h3 className="lp-info__titulo">Horario</h3>
                  <p>Consulta nuestro horario de atención llamándonos.</p>
                </article>
                <article className="lp-info">
                  <FaMapMarkerAlt
                    className="lp-info__icono"
                    aria-hidden="true"
                  />
                  <h3 className="lp-info__titulo">Ubicación</h3>
                  <p>Cra. 19 # 14B - 28, barrio Prado Vegas, Soacha.</p>
                </article>
              </div>
              <div className="lp-mapa">
                {/* Espacio reservado: agregar aquí el mapa o una imagen de ubicación. */}
                <div
                  className="lp-mapa__iframe lp-imagen-pendiente"
                  role="img"
                  aria-label="Espacio reservado para el mapa de ubicación"
                >
                  <span>Mapa de ubicación</span>
                </div>
                <div className="lp-mapa__pie">
                  <div>
                    <strong>JC Casas Restaurante</strong>
                    <span>Prado Vegas, Soacha</span>
                  </div>
                  <a
                    className="lp-boton lp-boton--primario lp-boton--compacto"
                    href="https://maps.google.com/?q=Prado+Vegas+Soacha"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Cómo llegar
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="preguntas-contacto" className="lp-seccion">
          <div className="contenedor lp-preguntas">
            <header className="lp-seccion__cabecera lp-seccion__cabecera--izquierda">
              <p className="lp-seccion__antetitulo">Preguntas frecuentes</p>
              <h2 className="lp-seccion__titulo">¿En qué podemos ayudarte?</h2>
            </header>
            <div className="lp-acordeon">
              {preguntas.map(([pregunta, respuesta], index) => {
                const abierto = preguntaAbierta === index;
                const idPanel = `respuesta-pregunta-${index + 1}`;

                return (
                  <article
                    className={`lp-acordeon__item${abierto ? " lp-acordeon__item--abierto" : ""}`}
                    key={pregunta}
                  >
                    <h3 className="lp-acordeon__encabezado">
                      <button
                        className="lp-acordeon__pregunta"
                        type="button"
                        aria-expanded={abierto}
                        aria-controls={idPanel}
                        onClick={() =>
                          setPreguntaAbierta(abierto ? null : index)
                        }
                      >
                        {pregunta}
                        <FaArrowDown
                          className="lp-acordeon__icono"
                          aria-hidden="true"
                        />
                      </button>
                    </h3>
                    <div
                      className="lp-acordeon__panel"
                      id={idPanel}
                      aria-hidden={!abierto}
                    >
                      <div className="lp-acordeon__contenido">
                        <p>{respuesta}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

          </div>
        </section>
      </main>
      <Footer />
      {mostrarVolverArriba && (
        <a
          className="lp-volver-inicio"
          href="#lp-portada"
          aria-label="Volver al inicio de la página"
          title="Volver arriba"
          onClick={(event) => {
            event.preventDefault();
            window.history.pushState(null, "", "#lp-portada");
            scrollToSection("lp-portada");
          }}
        >
          <FaArrowUp aria-hidden="true" />
          <span>Volver arriba</span>
        </a>
      )}
    </div>
  );
}

export default Landing;
