import './ProjectCard.css'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

export default function ProjectCard({ project }) {
  const history = useHistory();
  const [ formActive, setFormActive ] = useState(false);
  const [ showCard, setShowCard ] = useState(true);

  const handleClick = e => {
    if( project !== undefined ){ 
      history.push(`/projects/${project.id}`)
    } else {
      setFormActive(!formActive);
    }
  } 

  const className = formActive ? "project-card project-card-active" : "project-card"

  return (
    <CSSTransition in={showCard} timeout={500} onExited={handleClick} classNames="project-card">
      <div className={className} onClick={()=>setShowCard(false)}>
        {project?.title || "Start a Project"}
      </div>
    </CSSTransition>
  )
}
