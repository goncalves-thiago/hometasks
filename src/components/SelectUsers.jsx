//Hooks
import { useEffect } from "react";
import { useGetFamilyUsers } from "../hooks/useGetFamilyUsers";


const SelectUsers = ({familyId, task, ...rest}) => {

  const {users, loadData: loadUsers} = useGetFamilyUsers(familyId);

  useEffect(() => {
    loadUsers();
  },[familyId, loadUsers]);

  if (task) {
    return (
      <select className="form-select" id="owner" aria-label="Owner Select" {...rest}>
      { users && users.map((user) => {
          
          if (user.id === task.user_id) {
              return (<option defaultValue={user.id} key={user.id} >{user.name}</option>);
          } else { 
              return (<option value={user.id} key={user.id}>{user.name}</option>);
          }
      })}
      </select>  
    );

  } else {
    return (
      <select className="form-select" id="owner" aria-label="Owner Select" {...rest}>
        <option value="">Selecione um membro</option>
        { users && users.map((user) => {
            return (<option value={user.id} key={user.id} >{user.name}</option>);
          }
        )}
      </select>  
    );
  };
};

export default SelectUsers;