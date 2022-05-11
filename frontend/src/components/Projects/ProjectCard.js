import './ProjectCard.css'
import { useHistory } from 'react-router-dom';

export default function ProjectCard({ project }) {
  const history = useHistory();

  const handleClick = e => history.push(`/projects/${project.id}`) 

  return (
    <div className="project-card" onClick={handleClick}>
      {project.title} 
    </div>
  )
}
