// Hooks
import { useEffect, useState } from "react";

const FamilyTasksDashboard = ({dashboard}) => {

  const [tasksCompletedPercentage, setTasksCompletedPercentage] = useState(0);
  const [tasksExpiredPercentage, setTasksExpiredPercentage] = useState(0);


  useEffect(() => {
    if(dashboard && dashboard.total > 0) {
        setTasksCompletedPercentage(((dashboard.totalCompleted * 100) / dashboard.total).toFixed(0));
        setTasksExpiredPercentage(((dashboard.totalExpired * 100) / dashboard.total).toFixed(0));
     }
  },[dashboard]);

  return (
    <div className="col-md-4 col-xl-3 d-none d-md-block" id="card-family">
        <div className="card h-100 text-center">
            <div className="card-body">
                <div className="d-flex card-top align-items-center justify-content-center">
                    <div className="card-logo align-items-center justify-content-center">
                        <i className="bi bi-bar-chart card-icon"></i>
                    </div>
                </div>
                <h5 className="text-primary mt-2 mb-2">Tarefas da Familia</h5>
                <div className="text-start">
                    <p className="text-muted mb-1">Total: {dashboard.total ? dashboard.total : 0}</p>
                    <p className="text-muted mb-1">Completadas:</p>
                    <div className="progress mb-2" role="progressbar" aria-label="Tasks Completed" aria-valuenow={tasksCompletedPercentage} aria-valuemin="0" aria-valuemax="100">
                        {tasksCompletedPercentage && <div className="progress-bar bg-success" style={{width: + tasksCompletedPercentage + "%"}}>{tasksCompletedPercentage}%</div>}
                    </div>
                    <p className="text-muted mb-1">Expiradas:</p>
                    <div className="progress" role="progressbar" aria-label="Tasks Expirated" aria-valuenow={tasksExpiredPercentage} aria-valuemin="0" aria-valuemax="100">
                        {tasksExpiredPercentage && <div className="progress-bar bg-danger" style={{width: + tasksExpiredPercentage + "%"}}>{tasksExpiredPercentage}%</div>}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default FamilyTasksDashboard;