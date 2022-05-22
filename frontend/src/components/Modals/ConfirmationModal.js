import { useEffect, useState, useContext, useRef } from 'react';
import ReactDOM from 'react-dom';
import { ModalContext } from '../../context/Modal'; 

import './ConfirmationModal.css';

export function Modal({children, hideModalFunc}) {
  const modalNode = useContext(ModalContext);
  if(!modalNode) return null;

  return ReactDOM.createPortal(
    <div className="modal-background" onMouseDown={hideModalFunc}>
      {children}
    </div>
  , modalNode);
}

/* */
export default function ConfirmationModal({ children, func, project, buttonsActive }) {
  const [ showModal, setShowModal ] = useState(false);
  const [ title, setTitle ] = useState('');
  const confirmRef = useRef(null);

  useEffect(()=>{
    if(showModal){
      confirmRef.current.focus();
    }
  }, [showModal])

  const showModalFunc = e => { 
    if(buttonsActive){
      setShowModal(true) 
      e.stopPropagation();
    }
  };
  const hideModalFunc = e => {
    setShowModal(false);
    setTitle('');
  }
 
  const updateTitle = e => setTitle(e.target.value);

  const stopTheProp = e => e.stopPropagation();

  const doAction = e => {
    if( title !== project.title ) return;
    func();
    hideModalFunc();
  }

  return (
    <>
      <div onClick={showModalFunc}>
        {children}
      </div>
      { showModal && (
        <Modal hideModalFunc={hideModalFunc}>
          <div  className="confirmation-modal"
                onClick={stopTheProp}
                onMouseDown={stopTheProp}>
            <div className="modal-text delete-warning">Deleting a project is permanent and <strong>cannot be undone</strong>.</div>
            <div className="modal-text delete-prompt">To delete your project, type its name.</div>
            <div className="modal-text delete-project-name">{project.title}</div>
            <form className="modal-form" onSubmit={doAction}>
              <input  type="text"
                      className="modal-input"
                      value={title}
                      ref={confirmRef}
                      onChange={updateTitle} />
              <button type="submit" 
                      disabled={title !== project.title}
                      className="red-button">Delete Project</button>
            </form>
          </div>
        </Modal>
      )}
    </>
  )


}
