// Styles
import './Dashboard.css';

// Hooks
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from "../../Context/AuthContext";
import { useGetTasks } from "../../hooks/useGetTasks";
import { useGetDashboard } from '../../hooks/useGetDashboard';
import { useGetFamily } from '../../hooks/useGetFamily';

// Components
import Loading from '../../components/Loading/Loading';
import Avatar from '../../components/Avatar/Avatar';
import SelectStatus from '../../components/SelectStatus/SelectStatus';
import StatusDashboard from '../../components/StatusDashboard/StatusDashboard';
import FamilyDashboard from '../../components/FamilyDashboard/FamilyDashboard';

// Util
import { statusColor, badgeColor, statusName }from '../../Util/Util';

// Plugins
import {format, setDefaultOptions } from "date-fns";

// Locale for date-fns plugin
import { ptBR } from 'date-fns/locale';
import FamilyTasksDashboard from '../../components/FamilyTasksDashboard/FamilyTasksDashboard';
setDefaultOptions({ locale: ptBR});

const Dashboard = () => {

  const today = new Date();
  const navigate = useNavigate();
  const {userData} = useAuthValue();
  const {tasks, loading: loadingTasks, loadData: loadTasks} = useGetTasks(userData.familyId);
  const [status, setStatus] = useState("all");
  const [month] = useState(format(today, 'MM'));
  const {statusDashboard, familyTasksDashboard, loading: loadingDashboard, loadData: loadDashboard} = useGetDashboard(month);
  const {family} = useGetFamily(userData.familyId);

  useEffect(() => {
    loadTasks();
    loadDashboard();
  },[loadTasks, loadDashboard]);

  const handleRefresh = () => {
    loadTasks();
    loadDashboard();
  }

  if(loadingDashboard) { return <Loading size={"full"} />  }

  return (
    
    <div className="container" id="dashboard">
      
      {/* ---Row--- */}
      <div className="row">
        
        {/* ---Avatar--- */}
        <Avatar size="full" />
        {/* ---Avatar end--- */}

        {/* ---Status Dashboard--- */}
        <StatusDashboard dashboard={statusDashboard} family={family}/>
        {/* ---Status Dashboard end--- */}
 
        {/* ---Family Dashboard--- */}
        <FamilyDashboard family={family}/>
        {/* ---Family Dashboard end--- */}

        {/* ---Family Tasks Dashboard--- */}
        <FamilyTasksDashboard dashboard={familyTasksDashboard}/>
        {/* ---Family Tasks Dashboard end--- */}
      
      </div>
      {/* ---Row end--- */}
    
      {/* --- Status select--- */}
      <SelectStatus status={status} setStatus={setStatus} refresh={handleRefresh} size="full" />
      {/* --- Status select end--- */}

      {/* ---No pending tasks--- */}      
      {(!tasks && userData.familyId) && 
          <div className="row mt">
            <div className="col">
              <div className="alert alert-success text-center mt-4" role="alert">Não há tarefas cadastradas para este mês!</div>
            </div> 
          </div>}
      {/* ---No pending tasks end--- */}

      {/* ---No family--- */}      
      {!userData.familyId && 
          <div className="row mt">
            <div className="col">
              <div className="alert alert-primary text-center mt-4" role="alert">Você ainda não possui uma família. 
                  Crie uma ou aguarde ser adicionado em uma existente!</div>
            </div> 
          </div>}
      {/* ---No familys end--- */}

      {/* ---Tasks cards--- */}
      <div className="row mt-4">
      
      {loadingTasks ? <Loading /> : 
      
      tasks && tasks.map((task) => {
        if((status !== "all") && (task.status !== status)) return null;
        if((task.status === "pending" || task.status === "inProgress") && task.deadline < format(today, 'yyyy-MM-dd')) {
          task.status = "expired";
        }

        return (
          <div className="col-12 col-md-6 col-xl-4" key={task.id}>      
            <div className="card mb-4" id="card-task" onClick={()=>navigate(`/task/${task.id}`)}>
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <div className='card-top'>
                      <p>
                        <span className={statusColor[task.status]}>
                          <i className="bi bi-circle-fill"></i>
                        </span>
                        <span className="capitalize text-muted">
                          {format(task.deadline, 'dd MMM, yyyy')}
                      </span>
                      </p>
                    </div>
                  </div>                                  
                </div>
                <h5 className="card-title">{task.title}</h5>
                <p className="text-muted">{task.description}</p>
                <div className="d-flex card-bottom">
                  <span>
                    <Avatar userId={task.user_id} />
                  </span>                
                  <span className={`badge ${badgeColor[task.status]}`}>{statusName[task.status]}</span> 
                </div>              
              </div>
            </div>
          </div>
      )})}      
    </div>
      {/* ---Tasks cards end--- */}

    </div>
    // ---Container end---
  );
};

export default Dashboard;