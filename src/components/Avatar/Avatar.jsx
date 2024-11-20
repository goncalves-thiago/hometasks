// Styles
import './Avatar.css';

// Hooks
import { useGetUser } from '../../hooks/useGetUser';
import { useNavigate } from 'react-router-dom';

// Context
import { useAuthValue } from '../../Context/AuthContext';

// Util
import { nameInitials, API_URL } from '../../Util/Util';

const Avatar = ({userId, size}) => {

    const {user} = useGetUser(userId);
    const {userData} = useAuthValue();
    const navigate = useNavigate();
    
    if(size === "full") {
        return (
            <div className="col-xl-2 d-none d-xl-block">
                <div className="card h-100 text-center">
                    <div className="card-body">   
                
                        {userData.avatarUrl ? 
                            <img src={`${API_URL}/${userData.avatarUrl}`} className="img-fluid avatar-xl rounded-circle" 
                                alt="avatar" onClick={()=>navigate("/ChangeAvatar")}/> :

                            <div className="avatar-xl rounded-circle d-flex align-items-center justify-content-center" 
                                alt="avatar" onClick={()=>navigate("/changeAvatar")}>
                                <p className="m-0">{nameInitials(userData.name)}</p>
                            </div>
                        }

                        <p className="text-primary font-size-16 lh-1 mt-3 mb-0">{userData.name}</p>
                        <p className="text-muted font-size-12 mb-0">{userData.isOwner ? "Responsável" : "Membro"}</p>
                    </div>
                </div>
            </div>
        );

    } else {
        
        return (
            <div className="avatar-sm rounded-circle d-flex align-items-center justify-content-center" alt="avatar">
                <p className="m-0">{nameInitials(user.name)}</p>
            </div>
        );
    }
};

export default Avatar;