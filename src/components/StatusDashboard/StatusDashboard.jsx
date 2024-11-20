// Styles
import './StatusDashboard.css';

// Hooks
import { useState } from 'react';

// Components
import Allowance from '../Allowance';

// Context
import { useAuthValue } from '../../Context/AuthContext';

// Util
import { hasFamily } from '../../Util/Util';

// Plugins
import {format, setDefaultOptions } from "date-fns";

// Locale for date-fns plugin
import { ptBR } from 'date-fns/locale';
setDefaultOptions({ locale: ptBR});

const StatusDashboard = ({dashboard, family}) => {

  const today = new Date();
  const [month] = useState(format(today, 'MM'));
  const {userData} = useAuthValue();

  return (
    <div className="col-12 col-md-4 col-xl-3">     
        <div className="card h-100 text-start">
            <div className="card-body">
                <h2 className="text-success text-center mb-0"><Allowance userId={userData.id} month={month}/></h2>
                <p className="text-muted text-center mt-0 capitalize">{format(today, 'MMMM, yyyy')}</p>
                <div className="dashboard-status">
                    <p className="text-pending">
                        <span><i className="bi bi-watch"></i> Pendente:</span>
                        <span>{hasFamily(userData) ? dashboard.pending : 0}</span>
                    </p>
                </div>
                <div className="dashboard-status">
                    <p className="text-primary">
                        <span><i className="bi bi-tools"></i> Iniciado:</span>
                        <span>{hasFamily(userData) ? dashboard.inProgress : 0}</span>
                    </p>
                </div>
                <div className="dashboard-status">
                    <p className="text-review">
                        <span><i className="bi bi-hourglass-split"></i> Revisão:</span>
                        <span>{hasFamily(userData) ? dashboard.inReview : 0}</span>
                    </p>
                </div>
                <div className="dashboard-status">
                    <p className="text-success">
                        <span><i className="bi bi-check-circle"></i> Completado:</span>
                        <span>{hasFamily(userData) ? dashboard.completed : 0}</span>
                    </p>
                </div>
                <div className="dashboard-status">
                    <p className="text-danger">
                        <span><i className="bi bi-x-circle"></i> Expirado:</span>
                        <span>{hasFamily(userData) ? dashboard.expired : 0}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default StatusDashboard;