// Styles
import './NewTask.css';
import "react-datepicker/dist/react-datepicker.css";

// Hooks
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateTask } from '../../hooks/useCreateTask';

// Context
import { useAuthValue } from '../../Context/AuthContext';

// Components
import SelectUsers from '../../components/SelectUsers';

// Plugins
import DatePicker, { setDefaultLocale } from 'react-datepicker';
import {format, lastDayOfMonth} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

// Locale for date-picker plugin
setDefaultLocale(ptBR);

const NewTask = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [owner, setOwner] = useState("");
    const [error, setError] = useState("");
    const [information, setInformation] = useState("");
    const [disableSaveButton, setDisableSaveButton] = useState(true);
    const [disableFields, setDisableFields] = useState(false);
    
    const navigate = useNavigate();
    const {userData} = useAuthValue();
    const {createTask, error: createTaskError} = useCreateTask();

    // Get today and last day of month
    const today = new Date();
    const endDate = format(lastDayOfMonth(today), 'yyyy-MM-dd HH:mm:ss');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setInformation("");

        if(!title || !description || !deadline || !owner) {
            setError("Você deve preencher todos os campos para criar uma nova tarefa!")
        } else {
            const data = {
                title: title,
                description: description,
                deadline: format(deadline, 'yyyy-MM-dd'),
                user_id: owner,
                family_id: userData.familyId,
            };

            await createTask(data);
            setDisableFields(true);
            setDisableSaveButton(true);
            setInformation("A tarefa foi criada com sucesso!")
        }
    }

  return (  
    <div className="container" id="task">
        <div className="row d-flex justify-content-center">
            <div className="col-xl-8">
                <form onChange={()=>setDisableSaveButton(false)} onSubmit={(e) => handleSubmit(e)}>
                    <div className="card">
                        <div className="card-body">
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="title"className="form-label text-muted">Título:</label>
                                    <input type="text" className="form-control" id="title" value={title} disabled={disableFields} required
                                        onChange={(e) => setTitle(e.target.value)} placeholder="Insira um título para a tarefa"/>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="description"className="form-label text-muted">Descrição:</label>
                                    <textarea className="form-control" id="description" value={description} disabled={disableFields} required
                                        onChange={(e) => setDescription(e.target.value)} placeholder="Insira uma descrição para a tarefa" />     
                                </div>                                 
                            </div>
                            <div className="row mb-3">                       
                                <div className="col">
                                <label htmlFor="deadline" className="form-label text-muted">Prazo:</label><br />
                                <DatePicker id="deadline" selected={deadline} minDate={today} maxDate={endDate} dateFormat="P" required
                                    disabled={disableFields} onChange={(date) => { setDeadline(date); setDisableSaveButton(false) }} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="owner" className="form-label text-muted">Membro:</label>
                                <div className="col">

                                    {/* ---Family users select button---     */}
                                    <SelectUsers familyId={userData.familyId} onChange={(e) => setOwner(e.target.value)} 
                                        disabled={disableFields} required />
                     
                                </div>
                            </div>
                 
                            <div className="row row-cols-auto justify-content-center">
                     
                                {/* ---Back button--- */}
                                <div className="col mt-2">
                                    <button className="btn btn-task" onClick={()=>navigate("/")}>Voltar</button>
                                </div>
                        
                                {/* ---Save button--- */}
                                <div className="col mt-2">
                                    <input type="submit" className="btn btn-task" disabled={disableSaveButton} value="Salvar"/>
                                </div>
                                
                            </div>
                        </div>
            
                        {/* ---Error message--- */}
                        {createTaskError && <div className="alert alert-danger mt-2 mx-3 p-2 text-center" role="alert">{createTaskError}</div>}
                        {error && <div className="alert alert-danger mt-2 mx-3 p-2 text-center" role="alert">{error}</div>}

                        {/* ---Information message--- */}
                        {(!error && !createTaskError && information) ? <div className="alert alert-success mt-2 mx-3 p-2 text-center" 
                            role="alert">A tarefa foi criada com sucesso!</div> : null}
                    </div>
                </form>
            </div>
        </div>
    </div>

  );
};

export default NewTask;