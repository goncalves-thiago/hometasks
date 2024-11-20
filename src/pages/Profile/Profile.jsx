// Styles
import './Profile.css';

// Hooks
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUser } from '../../hooks/useGetUser';
import { useUpdateUser } from '../../hooks/useUpdateUser';

// Context
import { useAuthValue } from '../../Context/AuthContext';

const Profile = () => {

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [information, setInformation] = useState("");
  const [disableSaveButton, setDisableSaveButton] = useState(true);
  const {userData, refreshUser} = useAuthValue();
  const {user} = useGetUser(userData.id);
  const {updateUser, error: updateUserError} = useUpdateUser();
  const navigate = useNavigate();

  useEffect(() => {
    if(user) {
        setName(user.name.split(" ")[0]);
        setLastName(user.name.split(" ").slice(1).join(' '));
        setEmail(user.email);
    }
  },[user]);
  
  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setInformation("");

    if(!name || !lastName) {
        setError("É necessário preencher o campo nome!")
        return;
    }
    else if ((password) && (password !== confirmPassword)) {
        setError("As senhas precisam ser iguais!")
        return;
    }
    else {
        if(!password) {
            const newUser = {name: `${name} ${lastName}`};
            await updateUser(userData.id, newUser);
        } else {
            const newUser = {
                name: `${name} ${lastName}`,
                password: password,
            };
            await updateUser(userData.id, newUser);
        }
        setDisableSaveButton(true);
        setInformation("Usuário atualizado com sucesso!");
        refreshUser();
    }
}


  return (
    <div className="container" id="family">
        <div className="row d-flex justify-content-center">
            <div className="col-xl-8">
                <form onChange={()=>setDisableSaveButton(false)}>
                    <div className="card">
                        <div className="card-body">
                            
                            {/* ---Name--- */}
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="name"className="form-label text-muted">Nome:</label>
                                    <input type="text" className="form-control" id="name" value={name} required
                                        onChange={(e) => setName(e.target.value)} />
                                </div>
                            </div>
                            {/* ---Name--- */}                           

                            {/* ---Lastname--- */}
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="lastName"className="form-label text-muted">Sobrenome:</label>
                                    <input type="text" className="form-control" id="lastName" value={lastName} required
                                        onChange={(e) => setLastName(e.target.value)} />
                                </div>
                            </div>
                            {/* ---Lastname--- */}   

                            {/* ---Email--- */}
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="email"className="form-label text-muted">Email:</label>
                                    <input type="email" className="form-control" id="email" value={email} disabled
                                        onChange={(e) => setEmail(e.target.value)} />                             
                                </div>                                
                            </div>
                            {/* ---Email--- */}

                            {/* ---Password--- */}
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="password"className="form-label text-muted">Senha:</label>
                                    <input type="password" className="form-control" id="password" value={password} required
                                        onChange={(e) => setPassword(e.target.value)} />                             
                                </div>                                
                            </div>
                            {/* ---Password--- */}

                            {/* ---Confirm Password--- */}
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="confirmPassword"className="form-label text-muted">Confirme a senha:</label>
                                    <input type="password" className="form-control" id="ConfirmPassword" value={confirmPassword} required
                                        onChange={(e) => setConfirmPassword(e.target.value)} />                             
                                </div>                                
                            </div>
                            {/* ---Confirm Password--- */}

                            <div className="row row-cols-auto justify-content-center">
                        
                                {/* ---Back button--- */}
                                <div className="col mt-2">
                                    <button className="btn btn-family" onClick={()=>navigate("/")}>Voltar</button>
                                </div>

                                {/* ---Save button--- */}
                                <div className="col mt-2">
                                    <button className="btn btn-family" onClick={(e)=>handleSave(e)} disabled={disableSaveButton}>Salvar</button>
                                </div>
                        
                            </div>
                        </div>

                        {/* ---Error message--- */}
                        {error && <div className="alert alert-danger mt-2 mx-3 p-2 text-center" role="alert">{error}</div>}
                        {updateUserError && <div className="alert alert-danger mt-2 mx-3 p-2 text-center" role="alert">Erro ao atualizar o usuário!</div>}

                        {/* ---Information message--- */}
                        {(!error && !updateUserError && information) ? 
                        <div className="alert alert-success mt-2 mx-3 p-2 text-center" role="alert">{information}</div> : null}

                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default Profile;