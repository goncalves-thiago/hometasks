// Styles
import './Task.css';
import "react-datepicker/dist/react-datepicker.css";

// Hooks
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetTask } from '../../hooks/useGetTask';
import { useUpdateTask } from '../../hooks/useUpdateTask';
import { useUploadAttachment } from '../../hooks/useUploadAttachment';
import { useDeleteTask } from '../../hooks/useDeleteTask';

// Contexts
import { useAuthValue } from '../../Context/AuthContext';

// Components
import { statusName, isExpirated, API_URL, isPending } from '../../Util/Util';
import Loading from '../../components/Loading/Loading';
import SelectUsers from '../../components/SelectUsers';
import Attachment from '../../components/Attachment/Attachment';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';

// Plugins
import DatePicker, { setDefaultLocale } from 'react-datepicker';
import {format, lastDayOfMonth} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

// Locale for date-picker plugin
setDefaultLocale(ptBR);


const Task = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("");
  const [rawStatus, setRawStatus] = useState("");
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [owner, setOwner] = useState("");
  const [error, setError] = useState("");
  const [information, setInformation] = useState("");
  const [disableSaveButton, setDisableSaveButton] = useState(true);
  const [disableDeleteButton, setDisableDeleteButton] = useState(false);
  const [disableFields, setDisableFields] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const {id} = useParams();
  const navigate = useNavigate();
  const {userData} = useAuthValue();
  const {task, loading: taskLoading} = useGetTask(id);
  const {updateTask} = useUpdateTask();
  const {uploadAttachment} = useUploadAttachment();
  const {deleteTask} = useDeleteTask();

  // Get today and last day of month
  const today = new Date();
  const endDate = format(lastDayOfMonth(today), 'yyyy-MM-dd HH:mm:ss');

  useEffect(() => {
    if(task) {
        setTitle(task.title);
        setDescription(task.description);
        setDeadline(task.deadline);
        setOwner(task.user_id);
        if(task.attachmentUrl) setAttachmentUrl(`${API_URL}/${task.attachmentUrl}`);
        if(isExpirated({task})) {
            setStatus(statusName["expired"]);
            setRawStatus(task.status);
        } else {
            setStatus(statusName[task.status]);
            setRawStatus(task.status);
        }
    }
  },[task]);
  
  if(taskLoading) { return <Loading /> }

  const handleStart = async (e) => {
    e.preventDefault();
    setError("");
    setInformation("");
        
    if(isPending({task})) {
        setStatus(statusName["inProgress"]); 
        setRawStatus("inProgress");
        await updateTask(id, {status: "inProgress"});
        setInformation("A tarefa foi iniciada. Retorne aqui quando finalizar para enviar a foto e completá-la!")
    } else {
        setError("A tarefa já foi iniciada!");
    }
  }

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setInformation("");

    const data = {
        title: title,
        description: description,
        deadline: format(deadline, 'yyyy-MM-dd'),
        user_id: owner,
    };

    await updateTask(id, data);
    setDisableFields(true);
    setDisableSaveButton(true);
    setInformation("A tarefa foi atualizada com sucesso!")
  }

  const handleComplete = async (e) => {
    e.preventDefault();
    setError("");
    setInformation("");

    if(attachmentUrl) {
        setStatus(statusName["inReview"]);
        setRawStatus("inReview");

        await updateTask(id, {status: "inReview"});
        setInformation("A tarefa foi enviada para revisão do responsável da família. Ela poderá retornar para você ou ser concluída!")
    } else {
        setError("É necessário anexar uma foto antes de finalizar a tarefa.")
    }
  }

  const handleDelete = async () => {
    setError("");
    setInformation("");

    await deleteTask(id);
    setDisableFields(true);
    setDisableDeleteButton(true);
    setDisableSaveButton(true);
    setInformation("A tarefa foi deletada com sucesso!");
    setIsOpen(!isOpen);
  }

  const handleApprove = async (e) => {
    e.preventDefault();
    setError("");
    setInformation("");

    setStatus(statusName["completed"]);
    setRawStatus("completed");

    await updateTask(id, {status: "completed"});
    setInformation("A tarefa foi concluída. Agora ela não pode mais ser alterada!")
  }

  const handleDecline = async (e) => {
    e.preventDefault();
    setError("");
    setInformation("");

    if (deadline < format(today, 'yyyy-MM-dd')) {
        setError("Você deve selecionar um novo prazo para a tarefa!");
    } else {
        setStatus(statusName["inProgress"]);
        setRawStatus("inProgress");
        await updateTask(id, {status: "inProgress", deadline: format(deadline, 'yyyy-MM-dd')});
        setInformation("A tarefa foi recusada. Ela retornou ao membro para refaze-lá!");
        setDisableFields(true);
    }
  }

  const handleAttachment = async (e) => {

    // Show image on the screen
    setAttachmentUrl(URL.createObjectURL(e.target.files[0]));
    
    // Uploads the image
    const attachment = new FormData();
    attachment.append('file', e.target.files[0]);
    await uploadAttachment(id, attachment);
  }

  return (
    <div className="container" id="task">
       <div className="row d-flex justify-content-center">
        <div className="col-xl-8">
        <form onChange={()=>setDisableSaveButton(false)}>
            <div className="card">
                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="title"className="form-label text-muted">Título:</label>
                            <input type="text" className="form-control" id="title" value={title} required
                                onChange={(e) => setTitle(e.target.value)} 
                                disabled={(!userData.isOwner || isExpirated({task}) || rawStatus === "completed" || disableFields)} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="description"className="form-label text-muted">Descrição:</label>
                            <textarea className="form-control" id="description" value={description} required
                                onChange={(e) => setDescription(e.target.value)} 
                                disabled={(!userData.isOwner || isExpirated({task}) || rawStatus === "completed" || disableFields)} />     
                        </div>                                 
                    </div>
                    <div className="row mb-3">                       
                        <div className="col">
                            <label htmlFor="deadline" className="form-label text-muted">Prazo:</label><br />
                            <DatePicker id="deadline" selected={deadline} minDate={today} maxDate={endDate} dateFormat="P" required
                               onChange={(date) => { setDeadline(date); setDisableSaveButton(false) }} 
                               disabled={(!userData.isOwner || isExpirated({task}) || rawStatus === "completed" || disableFields)} />
                        </div>
                        <div className="col">
                            <label htmlFor="status" className="form-label text-muted">Status:</label>
                            <input type="text" className="form-control" id="status" value={status} disabled={true} required/>                 
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="owner" className="form-label text-muted">Membro:</label>
                        <div className="col">

                            {/* ---Family users select button---     */}
                            {task && <SelectUsers familyId={task.family_id} task={task} onChange={(e) => setOwner(e.target.value)} required
                            disabled={!userData.isOwner || isExpirated({task}) || rawStatus === "completed" || disableFields} />}
                        
                        </div>
                    </div>
                    
                    {/* ---File input--- */}
                    {!attachmentUrl && 
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="attachment" className="form-label text-muted">Foto:</label>
                            <input type="file" className="form-control" id="attachment" onChange={(e) => handleAttachment(e)}
                                 disabled={ ((!userData.isOwner && rawStatus === "inProgress" && !isExpirated({task})) && !disableFields) ? false : true }/>
                        </div>
                    </div>
                    }
                    
                    {/* ---Attachment thumbnail--- */}
                    {attachmentUrl && 
                    <div className="row text-center">
                        <div className="col mt-2">
                            <Attachment src={attachmentUrl} className="img-thumbnail mb-3" alt={task.name} task={task}
                                status={status} setAttachmentUrl={setAttachmentUrl} />
                        </div>
                    </div>
                    }

                    <div className="row row-cols-auto justify-content-center">
                        
                        {/* ---Back button--- */}
                        <div className="col mt-2">
                            <button className="btn btn-task" onClick={()=>navigate("/")}>Voltar</button>
                        </div>
                        
                        {/* ---Save button--- */}
                        {(userData.isOwner) ?
                        <div className="col mt-2">
                            <button className="btn btn-task" onClick={(e)=>handleSave(e)} disabled={disableSaveButton}>Salvar</button>
                        </div> : null
                        }

                        {/* ---Start button--- */}
                        {(!userData.isOwner && rawStatus === "pending") ?
                            <div className="col mt-2">
                                <button className="btn btn-task" onClick={(e)=>handleStart(e)}>Iniciar</button>
                            </div> : null
                        }

                        {/* ---Complete button--- */}
                        {(!userData.isOwner && rawStatus === "inProgress" && !isExpirated({task})) ?
                            <div className="col mt-2">
                                <button className="btn btn-task" onClick={(e)=>handleComplete(e)}>Finalizar</button>
                            </div> : null
                        }

                        {/* ---Delete button--- */}
                        {(userData.isOwner && rawStatus !== "completed") ?
                            <div className="col mt-2">
                            <button className="btn btn-danger" disabled={disableDeleteButton} 
                                onClick={(e)=>{e.preventDefault();setIsOpen(!isOpen)}}>Deletar</button>
                            </div> : null
                        } 

                        {/* ---Reject button--- */}
                        {(userData.isOwner && rawStatus === "inReview") ?
                            <div className="col mt-2">
                                <button className="btn btn-warning" disabled={disableFields} onClick={(e)=>handleDecline(e)}>Recusar</button>
                            </div> : null
                        }

                        {/* ---Approve button--- */}
                        {(userData.isOwner && rawStatus === "inReview") ?
                            <div className="col mt-2">
                                <button className="btn btn-success" disabled={disableFields} onClick={(e)=>handleApprove(e)}>Aprovar</button>
                            </div> : null
                        }                       

                    </div>
                </div>

                {/* ---Modal delete task--- */}
                <ConfirmationModal 
                isOpen={isOpen} 
                setIsOpen={setIsOpen}
                title={"Deseja deletar a tarefa?"} 
                description={"Essa ação irá apagar a tarefa permanentemente."}
                action={handleDelete}
                />

                {/* ---Error message--- */}
                {error && <div className="alert alert-danger mt-2 mx-3 p-2 text-center" role="alert">{error}</div>}

                {/* ---Information message--- */}
                {information && <div className="alert alert-success mt-2 mx-3 p-2 text-center" role="alert">{information}</div>}
            </div>
        </form>
        </div>
       </div>
    </div>
  );
};

export default Task;