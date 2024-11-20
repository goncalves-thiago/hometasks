// Styles
import "./Navbar.css";

// Hooks
import { NavLink } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication";

// Context
import { useAuthValue } from "../../Context/AuthContext";

const Navbar = () => {

  const {logout} = useAuthentication();
  const {userData} = useAuthValue();

  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark" id="navbar">
        <div className="container">
            <NavLink to="/" className="navbar-brand"><span>Home Tasks</span></NavLink>

            <button 
              className="navbar-toggler" 
              type="button" data-bs-toggle="collapse" 
              data-bs-target="#navbar-items"
              aria-controls="navbar-items"
              aria-expanded="false"
              aria-label="Toggle navigation"
              >
                <i className="bi bi-list"></i>
            </button> 
            <div className="collapse navbar-collapse" id="navbar-items">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link">Início</NavLink>
                </li>
                {userData.isOwner &&
                <li className="nav-item">
                  <NavLink to={"/family"} className="nav-link">Família</NavLink>
                </li>
                }
                {userData.isOwner &&
                <li className="nav-item">
                  <NavLink to={"/report"} className="nav-link">Relatório</NavLink>
                </li>
                }
                {!userData.familyId &&
                <li className="nav-item">
                  <NavLink to={"/createFamily"} className="nav-link">Criar Família</NavLink>
                </li>
                }                
                <li className="nav-item">
                  <NavLink to="/profile" className="nav-link">Perfil</NavLink>
                </li>
                <li className="nav-item">
                  <button onClick={logout} className="nav-link">Sair</button>
                </li>
              </ul>
            </div>
        </div>
    </nav>
  );
};

export default Navbar;