// Styles
import styles from './Attachment.module.css';

// Hooks
import { useState, useCallback, useEffect } from 'react';
import { useRemoveAttachment } from '../../hooks/useRemoveAttachment';

// Components
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

const Attachment = ({ zoom, task, status, setAttachmentUrl, ...rest }) => {
  const [click, setClick] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const {removeAttachment, error: removeAttachmentError} = useRemoveAttachment();

  const escFunction = useCallback((event) => {
    if (event.key === 'Escape') {
      (click) ? setClick(true) : setClick(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false)

    return () => {
      document.removeEventListener('keydown', escFunction, false)
    }
  }, []);

  const handleDeleteAttachment = async () => {
    await removeAttachment(task.id);
    setAttachmentUrl("");
    setIsOpen(!isOpen);
  }
  
    return (
      <>
        {click ? (
          <div onClick={()=>setClick(false)} className={`${styles.lightbox} ${styles.show}`}>
            <img {...rest} className={styles.show_image} />
          </div>
        ) : (
          <div className={styles.thumbnailHolder}>
            <div className={styles.thumbnail}> 
              {(status === 'Iniciado') ? <button type="button" className={`btn-close ${styles.btnClose}`} 
                  onClick={()=>setIsOpen(!isOpen)}></button> : null}
              <img {...rest} onClick={()=>setClick(true)} />
            </div>
          </div>
        )}

        {/* ---Modal remove member--- */}
        <ConfirmationModal 
          isOpen={isOpen} 
          setIsOpen={setIsOpen}
          title={"Deseja deletar a foto?"} 
          description={"Essa ação irá apagar a foto desta tarefa."}
          action={handleDeleteAttachment}
        />

        {/* ---Error message--- */}
        {removeAttachmentError && <div className="alert alert-danger mt-2 mx-3 p-2 text-center" role="alert">{removeAttachmentError}</div>}

      </>
    );
};

export default Attachment;
