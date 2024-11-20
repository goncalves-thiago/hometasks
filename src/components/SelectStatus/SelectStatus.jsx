// Styles
import './SelectStatus.css';

// Hooks
import { useNavigate } from "react-router-dom";

// Context
import { useAuthValue } from "../../Context/AuthContext";

const SelectStatus = ({status, setStatus, refresh}) => {

    const navigate = useNavigate();
    const {userData} = useAuthValue();

    return (
        <>
        <div className="row mt-4 d-none d-lg-block">
            <div className="col" id="status-select">
                <div className="card">
                    <div className="card-body status-select-bar">
                        <ul className="nav nav-pills">
                            <li className="nav-item">
                            <button className={`nav-link ${status === "all" ? "active" : null}`} onClick={()=>setStatus("all")}>Todos</button>
                            </li>
                            <li className="nav-item">
                            <button className={`nav-link ${status === "pending" ? "active" : null}`} onClick={()=>setStatus("pending")}>Pendentes</button>
                            </li>
                            <li className="nav-item">
                            <button className={`nav-link ${status === "inProgress" ? "active" : null}`} onClick={()=>setStatus("inProgress")}>Iniciados</button>
                            </li>
                            <li className="nav-item">
                            <button className={`nav-link ${status === "inReview" ? "active" : null}`} onClick={()=>setStatus("inReview")}>Revisão</button>
                            </li>
                            <li className="nav-item">
                            <button className={`nav-link ${status === "completed" ? "active" : null}`} onClick={()=>setStatus("completed")}>Completado</button>
                            </li>
                            <li className="nav-item">
                            <button className={`nav-link ${status === "expired" ? "active" : null}`} onClick={()=>setStatus("expired")}>Expirado</button>
                            </li>
                        </ul>
                        <ul className="nav nav-pills">
                            {userData.isOwner &&
                            <li className="nav-item">
                            <button className="nav-link" onClick={() => navigate("/task/new")}>Nova Tarefa</button>
                            </li>
                            }
                            <li className="nav-item">
                            <i className="bi bi-arrow-clockwise nav-link" onClick={() => refresh()}></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div className="row mt-4 d-lg-none">
            <div className="col" id="status-select">
                <div className="status-select-bar">
                    <select className="form-select" aria-label="Status Select" id="status-select" onChange={(e)=>setStatus(e.target.value)}>
                        <option value="all">Todos</option>
                        <option value="pending">Pendentes</option>
                        <option value="inProgress">Iniciados</option>
                        <option value="inReview">Revisão</option>
                        <option value="completed">Completados</option>
                        <option value="expired">Expirados</option>
                    </select>
                    <span><i className="bi bi-box-arrow-up" onClick={()=> navigate("/task/new")}></i></span>
                    <span><i className="bi bi-arrow-clockwise" onClick={() => refresh()}></i></span>
                </div>
            </div>
        </div>
        </>
        ); 
};

export default SelectStatus