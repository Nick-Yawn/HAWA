import './ProjectCard.css'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function ProjectCard({ project }) {
  const history = useHistory();
  const [ formActive, setFormActive ] = useState(false);

  const handleClick = e => {
    if( project !== undefined ){ 
      history.push(`/projects/${project.id}`)
    } else {
      setFormActive(!formActive);
    }
  } 

  const className = formActive ? "project-card project-card-active" : "project-card"

  return (
    <div className={className} onClick={handleClick}>
      {project?.title || "Start a Project"} 
    </div>
  )
}
