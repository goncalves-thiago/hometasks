// Styles
import './FamilyDashboard.css';

// Hooks
import { useEffect } from 'react';
import { useGetFamilyUsers } from '../../hooks/useGetFamilyUsers';
import { useGetUser } from '../../hooks/useGetUser';

const FamilyDashboard = ({family}) => {

  const {loadData: loadUsers, users} = useGetFamilyUsers(family.id);
  const {user: owner} = useGetUser(family.owner_id);
  
  useEffect(() => {
    loadUsers();
  },[family, loadUsers]);

  if(family) {
    return (
        <div className="col-md-4 col-xl-4 d-none d-md-block" id="card-family">
            <div className="card h-100 text-center">
                <div className="card-body">
                    <div className="d-flex card-top align-items-center justify-content-center">
                        <div className="card-logo align-items-center justify-content-center">
                            <i className="bi bi-people card-icon"></i>
                        </div>
                    </div>
                    <h4 className="text-primary mt-3 mb-3">{family.name}</h4>
                    <p className="text-muted mb-0">Membros:</p>
                    <p className="mb-2">{users.length}</p>
                    <p className="text-muted mb-0">Responsável:</p>
                    <p className="mb-0">{owner.name}</p>
                </div>
            </div>
        </div>
    );

    } else {

        return (
            <div className="col-md-4 col-xl-4 d-none d-md-block" id="card-family">
                <div className="card h-100 text-center">
                    <div className="card-body">
                        <div className="d-flex card-top align-items-center justify-content-center">
                            <div className="card-logo align-items-center justify-content-center">
                                <i className="bi bi-people card-icon"></i>
                            </div>
                        </div>
                        <h4 className="text-primary mt-5 mb-3">Você ainda não possui uma família.</h4>
                    </div>
                </div>
            </div>
        );
    };
};

export default FamilyDashboard;