// Styles
import styles from './ConfirmationModal.module.css';

const ConfirmationModal = ({isOpen, setIsOpen, title, description, action}) => {

  if(isOpen) {
    return (
        <div>
            <div className={styles.background}>
                <div className={styles.modal}>
                    <div className={styles.title}>
                        <h5>{title}</h5>
                        <button type="button" className="btn-close" onClick={()=>setIsOpen(!isOpen)}></button>
                    </div>
                    <div className={styles.description}>
                        <p>{description}</p>
                    </div>
                    <div className={styles.bottom}>
                        <button type="button" className="btn btn-secondary" onClick={()=>setIsOpen(!isOpen)}>Cancelar</button>
                        <button type="button" className="btn btn-danger" onClick={()=>action()}>Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
    );
  }
};

export default ConfirmationModal;