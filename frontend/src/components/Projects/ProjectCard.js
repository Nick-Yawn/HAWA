import './ProjectCard.css'
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux'
import { CSSTransition } from 'react-transition-group';
import { postProject } from '../../store/projects'; 

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
          formSubmitted,
          setFormSubmitted} = props;
  const dispatch = useDispatch();
  const isCreateCard      = project === undefined;
  const isSelectedProject = selectedProjectId === project?.id
  const [isMounted, setIsMounted] = useState(false);
  const [title, setTitle] = useState(project?.title || '')
  const inputRef = useRef(null);

  // this just ensures that the enter animations proc
  useEffect(()=>{
    setIsMounted(true);
  },[])

  //  this useEffect is required because the input doesn't mount until
  //    after the formActive variable is set to true, so if we try to
  //    fire it inside handleClick, the ref is still null
  useEffect(()=>{
    if( formActive && isCreateCard )
      inputRef.current.focus();
    if( !formActive ) 
      setTitle('');
  },[formActive, isCreateCard]);

  const handleSubmit = async e => {
    e.preventDefault();

    if( title.trim() === '' ) return;

    const newProject = await dispatch(postProject({title})) 

    if( newProject.id ){
      setSelectedProjectId(newProject.id);
      setFormSubmitted(true);
    }  
  }

  const handleKeyDown = e => {
    if(e.key === "Escape") setFormActive(false); 
  };

  const handleClick = e => {
    e.stopPropagation()
    if( isCreateCard ){
      if( projectExecuted ) return; //prevents cancelling enter-project animation
      if(!formActive) setFormActive(true);
      setSelectedProjectId(null);
    } else if( !isSelectedProject ){
      if( formActive || projectExecuted ) return;
      setSelectedProjectId(project.id);
    } else {
      setProjectExecuted(true)  // this fires the animation, which fires redirect when it ends
    }
  }

  const updateTitle = e => setTitle(e.target.value);

  let divClassName = formActive && isCreateCard ? "project-card project-card-active" : "project-card";
  if( isSelectedProject ) divClassName += " project-selected";

  return (
    <CSSTransition  in={(isMounted && !projectExecuted && !formActive) || (isCreateCard && formActive && !formSubmitted)} 
                    appear={true}
                    timeout={500} 
                    onExited={redirectToProject} 
                    classNames={isSelectedProject ? "selected-project" : "project-card"}> 
      <div className={divClassName} onClick={handleClick}>
        {project?.title  || formActive || "Start a Project"}
        {formActive && isCreateCard && (
          <form onSubmit={handleSubmit}>
            <input type="text" ref={inputRef} value={title} onChange={updateTitle} onKeyDown={handleKeyDown} />
          </form>
        )}
      </div>
    </CSSTransition>
  )
}
