import './ProjectCard.css'
import { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

// this component is either simply a link to the single project page, or a form to create a new project

export default function ProjectCard(props) {
  const { project, 
          selectedProjectId, 
          setSelectedProjectId, 
          projectExecuted,
          setProjectExecuted,
          redirectToProject, 
          formActive, 
          setFormActive } = props;
  const isCreateCard      = project === undefined;
  const isSelectedProject = selectedProjectId === project?.id
  const [isMounted, setIsMounted] = useState(false);
 
  // this just ensures that the enter animations proc
  useEffect(()=>{
    setIsMounted(true);
  },[])

  const handleClick = e => {
    if( isCreateCard ){
      setFormActive(!formActive);
      setSelectedProjectId(null);
    } else if( !isSelectedProject ){
      if( formActive ) return;
      setSelectedProjectId(project.id);
    } else {
      setProjectExecuted(true) 
    }
  }

  let className = formActive && isCreateCard ? "project-card project-card-active" : "project-card";
  if( isSelectedProject ) className += " project-selected";

  return (
    <CSSTransition  in={(isMounted && !projectExecuted && !formActive) || (isCreateCard && formActive)} 
                    appear={true}
                    timeout={500} 
                    onExited={redirectToProject} 
                    classNames={isSelectedProject ? "selected-project" : "project-card"}> 
      <div className={className} onClick={handleClick}>
        {project?.title || "Start a Project"}
      </div>
    </CSSTransition>
  )
}
