import './ProjectCard.css'
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux'
import { CSSTransition } from 'react-transition-group';
import { postProject, deleteProject, editProject } from '../../store/projects'; 
import ConfirmationModal from '../Modals/ConfirmationModal.js';

// this component is either simply a link to the single project page, or a form to create a new project
//    as this grows, I am struck by the thought that I should have made this two separate components
export default function ProjectCard(props) {
  const { project, 
          selectedProjectId, 
          setSelectedProjectId, 
          projectExecuted,
          setProjectExecuted,
          redirectToProject, 
          formActive, 
          setFormActive,
          editActive,
          setEditActive,
          formSubmitted,
          setFormSubmitted} = props;
  const dispatch = useDispatch();
  const isCreateCard      = project === undefined;
  const isSelectedProject = selectedProjectId === project?.id
  const [title, setTitle] = useState('')
  const [error, setError] = useState(false);
  const inputRef = useRef(null);
  const editRef = useRef(null);

  const cardActive =  (!projectExecuted && !formActive && !editActive) || // default cards
                      (isCreateCard && formActive && !formSubmitted) || // create form
                      (isSelectedProject && editActive); // edit form

  const buttonsActive = !isCreateCard && isSelectedProject && !editActive && !projectExecuted;

  //  this useEffect is required because the input doesn't mount until
  //    after the formActive variable is set to true, so if we try to
  //    fire it inside handleClick, the ref is still null
  useEffect(()=>{
    if( formActive && isCreateCard )
      inputRef.current.focus();
    if( !formActive ){
      setTitle('');// this is to clear the form after closing it 
      setError(null);
    }
  },[formActive, isCreateCard]);

  useEffect(()=>{
    if( error )
      if( title.trim() !== '' && title.length <= 80 )
        setError(null)
  },[title, error])

  useEffect(()=>{
    if( editActive && isSelectedProject ){
      editRef.current.focus();
      setTitle(project?.title);//hack alert: for some reason the useState won't grab the title
    } else {
      setError(null);
    }
  },[editActive, isSelectedProject])


  // event handlers
  const handleSubmit = async e => {
    e.preventDefault();
    if( formSubmitted ) return;
    if( title.trim() === '' ){ 
      setError('Title required.');
      return;
    } else if( title.length > 80 ){
      setError('Title must be less than 80 characters.');
      return;
    }
    const newProject = await dispatch(postProject({title: title.trim()})) 
    if( newProject.id ){
      setFormSubmitted(true);
      setSelectedProjectId(newProject.id);
    }  
  }

  const enterButtonFunc = async e => {
    if( !isSelectedProject || editActive ) return;
    handleClick(e);
  }

  const deleteButtonFunc = async e => {
    dispatch(deleteProject(project.id))
    setSelectedProjectId(0);
  }

  const editButtonFunc = e => {
    if( !isSelectedProject || editActive ) return;
    e.stopPropagation();
    setEditActive(true); 
  }

  const handleEdit = async e => {
    e.preventDefault();
    if( title.trim() === '' ){
      setError('Title required.');
      return;
    } else if( title.length > 80){
      setError('Title must be less than 80 characters');
      return;
    }
    const newTitle = await dispatch(editProject({id: project.id, title}));
    project.title = newTitle;
    setEditActive(false);
  }

  const handleKeyDown = e => {
    if(e.key === "Escape") {
      setFormActive(false); 
      setEditActive(false);
    }
  };

  const handleCardKeyDown = e => {
    if(e.key === "Enter"){
      handleClick(e);
    }
  };

  const handleContainerKeyDown = e => {
    if(e.key === "Escape"){
      setSelectedProjectId(null);
    }
  }

  const handleClick = e => {
    if( !cardActive ) return;
    e.stopPropagation();
    if( isCreateCard ){
      if( projectExecuted ) return; //prevents cancelling enter-project animation
      if(!formActive) setFormActive(true);
      setSelectedProjectId(null);
    } else if( !isSelectedProject ){
      if( formActive || projectExecuted ) return;
      setSelectedProjectId(project.id);
    } else if( isSelectedProject && editActive ) {
      return;
    } else {
      setProjectExecuted(true)  // this fires the animation, which fires redirect when it ends
    }
  }

  const displayErrorMessage = error && ((formActive && isCreateCard) || editActive)
  
  // controlled input
  const updateTitle = e => setTitle(e.target.value);


  // various classNames
  let divClassName = "project-card";
  if( isCreateCard ) divClassName += " create-card";
  if( formActive && isCreateCard ) divClassName += " project-card-active";
  if( isSelectedProject && editActive ) divClassName += " project-card-active";
  if( isSelectedProject ) divClassName += " project-selected";

  let animationClassName = isSelectedProject ? "selected-project" : "project-card";

  let containerClassName = "card-and-controls-container"
  if( isSelectedProject && formActive ) containerClassName += " new-project-card"

  return (
    <div className={containerClassName} onKeyDown={handleContainerKeyDown}>
      {displayErrorMessage && <div className="project-error-message error-flex-spacer">-</div>}
      <CSSTransition  in={cardActive}
                      appear={true}
                      timeout={500} 
                      onExited={redirectToProject} 
                      classNames={animationClassName}>

        <div className={divClassName} onClick={handleClick} tabIndex="0" onKeyDown={handleCardKeyDown} >
          { editActive || project?.title  || formActive || "Start a Project"}
          {formActive && isCreateCard && (
            <form onSubmit={handleSubmit} className="card-form">
              <input  type="text" 
                className={"card-input " + (title.length > 80 ? "bad-input" : "")}
                      ref={inputRef} 
                      value={title} 
                      onChange={updateTitle} 
                      onKeyDown={handleKeyDown} />
            </form>
          )}
          {isSelectedProject && editActive &&(
            <form onSubmit={handleEdit} className="card-form">
              <input  type="text" 
                      className={"card-input " + (title.length > 80 ? "bad-input" : "")}
                      ref={editRef} 
                      value={title} 
                      onChange={updateTitle} 
                      onKeyDown={handleKeyDown} />
            </form>
          )}
        </div >
      </CSSTransition>
      {displayErrorMessage && (
        <div className="project-error-message">{error}</div>
      )}
      <CSSTransition  in={buttonsActive}
                      timeout={500}
                      classNames="project-control-buttons">
          <div className="project-card-buttons-container">
            {/*<button onClick={enterButtonFunc}> Enter </button>*/}
            <button tabIndex={buttonsActive? "0" : "-1"} onClick={editButtonFunc}> Edit </button>
            <ConfirmationModal  func={deleteButtonFunc} 
                                project={project} 
                                buttonsActive={buttonsActive}>
              <button tabIndex={buttonsActive ? "0" : "-1"}> Delete </button>
            </ConfirmationModal>
          </div>
      </CSSTransition>
    </div>
  )
}
