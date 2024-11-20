// Styles
import './Family.css';

// Hooks
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetFamilyUsers } from '../../hooks/useGetFamilyUsers';
import { useGetFamily } from '../../hooks/useGetFamily';
import { useUpdateFamily } from '../../hooks/useUpdateFamily';
import { useManageUsers } from '../../hooks/useManageUsers';
import { useDeleteFamily } from '../../hooks/useDeleteFamily';

// Context
import { useAuthValue } from '../../Context/AuthContext';

// Components
import Loading from '../../components/Loading/Loading';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';


const Family = () => {

    const [name, setName] = useState("");
    const [allowance, setAllowance] = useState("");
    const [inviteMember, setInviteMember] = useState("");
    const [disableSaveButton, setDisableSaveButton] = useState(true);
    const [error, setError] = useState("");
    const [information, setInformation] = useState("");
    const [queryCounter, setQueryCounter] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [deleteIsOpen, setDeleteIsOpen] = useState(false);
    const [removeUserId, setRemoveUserId] = useState("");
    
    const {userData, refreshUser} = useAuthValue();
    const navigate = useNavigate();
    const {loadData: loadFamilyUsers, users, error: usersError, loading: usersLoading} = useGetFamilyUsers(userData.familyId);
    const {family, error: familyError, loading: familyLoading} = useGetFamily(userData.familyId);
    const {updateFamily, error: updateFamilyError, loading: updateFamilyLoading} = useUpdateFamily();
    const {users: noFamilyUsers, loadUsers, addUser, removeUser} = useManageUsers();
    const {deleteFamily, error: deleteFamilyError, loading: deleteFamilyLoading} = useDeleteFamily();

    useEffect(() => {
        if(family) {
            setName(family.name);
            setAllowance(family.allowance);
        }
    },[family]);

    useEffect(() => {
        loadFamilyUsers();
    },[loadFamilyUsers]);

    if (familyLoading || usersLoading || updateFamilyLoading) return <Loading size="full" />

    const handleSave = async (e) => {
        e.preventDefault();
        setError("");
        setInformation("");

        if(!name || !allowance) {
            setError("Você deve definir um nome e uma mesada para a família.")
        } else {
            const data = {
                name: name,
                allowance: allowance,
            };

            await updateFamily(userData.familyId, data);

            if(!updateFamilyLoading) {
                refreshUser();
                setInformation("A família foi editada com sucesso!");
            }
        }
    };

    const handleDelete = async (e) => {
        setError("");
        setInformation("");

        await deleteFamily(userData.familyId);

        if(!deleteFamilyLoading) {
            refreshUser();
            setInformation("A família foi deletada com sucesso!");
            setDeleteIsOpen(!deleteIsOpen);            
        }
    }

    const handleAllowance = (e) => {
        const newValue = e.target.value;

        if(newValue === '' || /^[0-9]+$/.test(newValue)) {
            setAllowance(newValue);
        }
    };

    const handleUserQuery = async (e) => {
        if(queryCounter >= 3) {
            await loadUsers(e.target.value);
            setQueryCounter(0);
        }
        
        if(e.target.validity.valid) {
            setInviteMember(noFamilyUsers.find((user) => user.email === e.target.value));
        } else {
            setInviteMember("");
        }
        
    };

    const handleInviteMember = async (e) => {
        e.preventDefault();
        setError("");
        setInformation("");

        if(inviteMember) {
            await addUser(family.id, {userId: inviteMember.id});

            setInformation("Membro adicionado com sucesso!");
            loadFamilyUsers();
        }
    };

    const handleRemoveMember = async () => {
        setError("");
        setInformation("");

        if(removeUserId) {
            await removeUser(family.id, {userId: removeUserId});
            setInformation("Membro removido com sucesso!");
            await loadFamilyUsers();
            setIsOpen(!isOpen);
        }
    };

  return (
    
    <div className="container" id="family">
        <div className="row d-flex justify-content-center">
            <div className="col-xl-8">
                <form onChange={()=>setDisableSaveButton(false)}>
                    <div className="card">
                        <div className="card-body">
                            
                            {/* ---Family Name--- */}
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="name"className="form-label text-muted">Nome:</label>
                                    <input type="text" className="form-control" id="nome" value={name} required
                                        onChange={(e) => setName(e.target.value)} />
                                </div>
                            </div>
                            {/* ---Family Name--- */}

                            {/* ---Allowance--- */}
                            <div className="row mb-3">
                                <div className="col-xl-4">
                                        <label htmlFor="allowance"className="form-label text-muted">Mesada:</label>
                                        <div className="input-group">
                                            <span className="input-group-text">R$</span>
                                            <input type="text" className="form-control" id="allowance" inputMode="numeric"
                                                value={allowance} required onChange={(e) => handleAllowance(e)} />
                                            <span className="input-group-text">.00</span>
                                        </div>                                  
                                </div>                                
                            </div>
                            {/* ---Allowance End--- */}

                            {/* ---Invite Member--- */}
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="user-email"className="form-label text-muted">Adicionar Membro:</label>
                                    <div className="input-group flex-nowrap">
                                        <span className="input-group-text">@</span>
                                        <input type="email" list="noFamilyUsersDataList" className="form-control" id="user-email" placeholder="E-mail" aria-label="E-mail" 
                                            aria-describedby="addon-wrapping" onChange={(e)=>handleUserQuery(e)}
                                            onKeyDown={(e)=>(e.key !== 'Backspace') ? setQueryCounter(queryCounter + 1) : null} />

                                        {/* ---Get users without family on API--- */}
                                        <datalist id="noFamilyUsersDataList">
                                        { noFamilyUsers && noFamilyUsers.map((noFamilyUser) => (
                                            <option key={noFamilyUser.id} value={noFamilyUser.email}>{noFamilyUser.name} ({noFamilyUser.email})</option>
                                        ))}
                                        </datalist>
                                        {/* ---Get users without family on API End--- */}

                                        <button className="btn btn-outline-secondary" type="button" onClick={(e)=>handleInviteMember(e)}
                                            disabled={inviteMember ? false : true}>Adicionar</button>
                                    </div>
                                </div>
                            </div>
                            {/* ---Invite Member End--- */}
 
                            {/* ---Family Members--- */}
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="members" className="form-label text-muted">Membros:</label>
                                    <table className="table table-striped table-users" id="members">
                                        <tbody>                                           

                                            {/* ---Get Family Members on API--- */}
                                            {(users.length > 0) ? users.map((user) => (
                                                <tr key={user.id}>
                                                    <td className="td-name">{user.name}</td>
                                                    <td className="td-action">
                                                        <button className="btn btn-outline-danger btn-remove" value={user.id} 
                                                            onClick={(e)=>{e.preventDefault(); setRemoveUserId(user.id); setIsOpen(!isOpen)}}>
                                                            <i className="bi bi-person-dash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )) : <tr><td className="td-name">Nenhum</td></tr>}
                                            {/* ---Get Family Members on API End--- */}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* ---Family Members End--- */}

                            <div className="row row-cols-auto justify-content-center">
                        
                                {/* ---Back button--- */}
                                <div className="col mt-2">
                                    <button className="btn btn-family" onClick={()=>navigate("/")}>Voltar</button>
                                </div>

                                {/* ---Save button--- */}
                                <div className="col mt-2">
                                    <button className="btn btn-success" onClick={(e)=>handleSave(e)} disabled={disableSaveButton}>Salvar</button>
                                </div>

                                {/* ---Delete button--- */}
                                <div className="col mt-2">
                                    <button className="btn btn-danger" onClick={(e)=>{e.preventDefault(); setDeleteIsOpen(!deleteIsOpen)}}>Deletar</button>
                                </div>                                
                           
                            </div>
                        </div>

                        {/* ---Error messages--- */}
                        {deleteFamilyError && <div className="alert alert-danger mt-2 mx-3 p-2 text-center" role="alert">{deleteFamilyError}</div>}
                        {updateFamilyError && <div className="alert alert-danger mt-2 mx-3 p-2 text-center" role="alert">{updateFamilyError}</div>}
                        {familyError && <div className="alert alert-danger mt-2 mx-3 p-2 text-center" role="alert">{familyError}</div>}
                        {usersError && <div className="alert alert-danger mt-2 mx-3 p-2 text-center" role="alert">{usersError}</div>}
                        {error && <div className="alert alert-danger mt-2 mx-3 p-2 text-center" role="alert">{error}</div>}

                        {/* ---Information message--- */}
                        {(!error && !updateFamilyError && !familyError && !usersError && !deleteFamilyError && information) ? 
                        <div className="alert alert-success mt-2 mx-3 p-2 text-center" role="alert">{information}</div> : null}

                        {/* ---Modal remove member--- */}
                        <ConfirmationModal 
                            isOpen={isOpen} 
                            setIsOpen={setIsOpen}
                            title={"Deseja remover o membro?"} 
                            description={"Essa ação irá apagar todas as tarefas e histórico do membro."}
                            action={handleRemoveMember}
                        />


                        {/* ---Modal delete family--- */}
                        <ConfirmationModal 
                            isOpen={deleteIsOpen} 
                            setIsOpen={setDeleteIsOpen}
                            title={"Deseja deletar a família?"} 
                            description={"Essa ação irá apagar todas as tarefas e histórico dos membros."}
                            action={handleDelete}
                        />

                    </div>
                </form>
            </div>
        </div>
    </div>

  );
};

export default Family;