import { useLocation } from "react-router-dom";
import "./route-transitions.css";

function RouteTransition({ children }) {
  const location = useLocation();

  return (
    <div key={location.pathname} className="ruta-transicion">
      {children}
    </div>
  );
}

export default RouteTransition;
