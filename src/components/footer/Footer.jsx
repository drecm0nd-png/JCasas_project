import { FaWhatsapp } from "react-icons/fa";
import "./footer.css";

function Footer() {
  return (
    <footer className="pie-pagina">
      <div className="pie-pagina__contenido">
        <section className="pie-pagina__seccion" aria-labelledby="pie-nosotros">
          <h2 className="pie-pagina__titulo" id="pie-nosotros">
            Nosotros
          </h2>
          <p className="pie-pagina__texto">
            Prepárate para probar nuestros ricos e increíbles desayunos y
            almuerzos, deleítate y satisface tu apetito.
          </p>
          <nav className="pie-pagina__redes" aria-label="Contacto en redes">
            <a
              href="https://wa.me/573144513235"
              aria-label="Contactar por WhatsApp"
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp aria-hidden="true" focusable="false" />
            </a>
          </nav>
        </section>

        <section className="pie-pagina__seccion" aria-labelledby="pie-contacto">
          <h2 className="pie-pagina__titulo" id="pie-contacto">
            Contacto
          </h2>
          <address className="pie-pagina__datos">
            <div className="pie-pagina__dato">
              <span>Teléfono</span>
              <a href="tel:+573144513235">314 451 3235</a>
            </div>
            <div className="pie-pagina__dato">
              <span>Correo electrónico</span>
              <a href="mailto:jcCasasRestaurant@gmail.com">
                jcCasasRestaurant@gmail.com
              </a>
            </div>
            <div className="pie-pagina__dato">
              <span>Dirección</span>
              <p>Crra 19 # 14B - 28 Barrio Prado Vegas</p>
            </div>
          </address>
        </section>
      </div>
      <p className="pie-pagina__credito">
        ©Restaurante JC Casas. <span>Xuafood</span>
      </p>
    </footer>
  );
}

export default Footer;
