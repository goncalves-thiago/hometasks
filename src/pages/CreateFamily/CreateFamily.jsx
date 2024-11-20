// Styles
import './CreateFamily.css';

// Hooks
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateFamily } from '../../hooks/useCreateFamily';

// Context
import { useAuthValue } from '../../Context/AuthContext';

const CreateFamily = () => {

  const [name, setName] = useState("");
  const [allowance, setAllowance] = useState("");
  const [disableCreateButton, setDisableCreateButton] = useState(true);
  const [error, setError] = useState("");
  const [information, setInformation] = useState("");
  const {createFamily, error: createFamilyError, loading: createFamilyLoading} = useCreateFamily();
  const {refreshUser} = useAuthValue();
  const navigate = useNavigate();

  const handleAllowance = (e) => {
    const newValue = e.target.value;

    if(newValue === '' || /^[0-9]+$/.test(newValue)) {
        setAllowance(newValue);
    }
  };

  const handleCreate = async (e) => {
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

        await createFamily(data);

        if(!createFamilyLoading) {
            refreshUser();
            setInformation("A família foi criada com sucesso!");
        }
    }
};

  return (
    <div className="container" id="family">
        <div className="row d-flex justify-content-center">
            <div className="col-xl-8">
                <form onChange={()=>setDisableCreateButton(false)}>
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

                            <div className="row row-cols-auto justify-content-center">
                        
                                {/* ---Back button--- */}
                                <div className="col mt-2">
                                    <button className="btn btn-family" onClick={()=>navigate("/")}>Voltar</button>
                                </div>

                                {/* ---Save button--- */}
                                <div className="col mt-2">
                                    <button className="btn btn-family" onClick={(e)=>handleCreate(e)} disabled={disableCreateButton}>Salvar</button>
                                </div>

                            </div>  
                        </div>

                        {/* ---Error messages--- */}
                        {createFamilyError && <div className="alert alert-danger mt-2 mx-3 p-2 text-center" role="alert">{createFamilyError}</div>}
                        {error && <div className="alert alert-danger mt-2 mx-3 p-2 text-center" role="alert">{error}</div>}

                        {/* ---Information message--- */}
                        {(!error && !createFamilyError && information) ? 
                        <div className="alert alert-success mt-2 mx-3 p-2 text-center" role="alert">{information}</div> : null}                        

                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default CreateFamily;