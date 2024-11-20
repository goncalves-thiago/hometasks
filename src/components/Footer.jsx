// Styles
import React from 'react'

// Hooks
import { Link } from 'react-router-dom';
import { useAuthentication } from '../hooks/useAuthentication'

// Context
import { useAuthValue } from '../Context/AuthContext';

export const Footer = () => {

  const {userData} = useAuthValue();
  const {logout} = useAuthentication();

  return (
    <div className="container">
        <footer className="py-3 my-4">
            <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item"><Link to="/" className="nav-link px-2 text-body-secondary">Início</Link></li>
            {userData.isOwner && <li className="nav-item"><Link to="/family" className="nav-link px-2 text-body-secondary">Família</Link></li>}
            {userData.isOwner && <li className="nav-item"><Link to="/report" className="nav-link px-2 text-body-secondary">Relatório</Link></li>}
            <li className="nav-item"><Link to="/profile" className="nav-link px-2 text-body-secondary">Perfil</Link></li>
            <li className="nav-item"><button className="nav-link px-2 text-body-secondary" onClick={()=>logout()}>Sair</button></li>
            </ul>
            <p className="text-center text-body-secondary">&copy; 2024 Home Tasks</p>
        </footer>
    </div>
  );
};
