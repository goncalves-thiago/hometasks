// Styles
import './CreateAccount.css';

// Hooks
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateUser } from '../../hooks/useCreateUser';

const CreateAccount = () => {

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [information, setInformation] = useState("");
  const [disableCreateButton, setDisableCreateButton] = useState(true);
  const {createUser, error: createUserError} = useCreateUser();
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setInformation("");
    
    if (!name || !lastName || !email || !password || !confirmPassword) {
        setError("É necessário preencher todos os campos!");
        return;
    }

    else if (password !== confirmPassword) {
        setError("As senhas precisam ser iguais!");
        return;
    } else {
        
        const data = {
            name: `${name} ${lastName}`,
            email: email,
            password: password,
        };

        await createUser(data);
        setDisableCreateButton(true);
        setInformation("Conta criada com sucesso! Retorne a página anterior e faça login.")
    }
  };

  return (
    <div className="container" id="family">
        <div className="row d-flex justify-content-center">
            <div className="col-xl-8">
                <form onChange={()=>setDisableCreateButton(false)} onSubmit={(e)=>handleSave(e)}>
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

                            {/* ---Last Name--- */}
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="lastName"className="form-label text-muted">Sobrenome:</label>
                                    <input type="text" className="form-control" id="lastName" value={lastName} required
                                        onChange={(e) => setLastName(e.target.value)} />
                                </div>
                            </div>
                            {/* ---Last Name--- */}                            

                            {/* ---Email--- */}
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="email"className="form-label text-muted">Email:</label>
                                    <input type="email" className="form-control" id="email" value={email} required
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
                                    <button className="btn btn-family" onClick={()=>navigate("/login")}>Voltar</button>
                                </div>

                                {/* ---Create button--- */}
                                <div className="col mt-2">
                                    <input type="submit" className="btn btn-family" disabled={disableCreateButton} value="Criar"/>
                                </div>
                        
                            </div>
                        </div>

                        {/* ---Error message--- */}
                        {error && <div className="alert alert-danger mt-2 mx-3 p-2 text-center" role="alert">{error}</div>}
                        {createUserError && <div className="alert alert-danger mt-2 mx-3 p-2 text-center" role="alert">{createUserError}</div>}

                        {/* ---Information message--- */}
                        {(!error && !createUserError && information) ? 
                        <div className="alert alert-success mt-2 mx-3 p-2 text-center" role="alert">{information}</div> : null}

                    </div>
                </form>
            </div>
        </div>
    </div>
  )
};

export default CreateAccount;