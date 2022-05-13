import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import { readProjects } from '../../store/projects';

import './Projects.css'

export default function Projects() {
  const dispatch = useDispatch();
  const history  = useHistory();
  const [ projectSelected, setProjectSelected ] = useState(null);
  const [ formActive, setFormActive ] = useState(false);
  const [ cardsHidden, setCardsHidden ] = useState(false);
  const projects = useSelector(state => state.projects)
  const projectsExist = projects?.length > 0; 

  useEffect(()=> {
    dispatch(readProjects())
  }, [dispatch])

  useEffect(()=>{
    if(formActive)
      setTimeout( () => setCardsHidden(true), 500 )
  },[formActive])

  const redirectToProject = () => {
    if( !formActive )
      history.push(`/projects/${projectSelected}`)
  };

  // the first card is not provided a project prop and therefore becomes the new project form
  return (
    <div className="project-card-container">
      <ProjectCard  projectSelected={projectSelected} 
                    setProjectSelected={setProjectSelected}
                    redirectToProject={redirectToProject}
                    formActive={formActive}
                    setFormActive={setFormActive}
                    />
      {projectsExist && !cardsHidden && (
        projects.map(project => 
          <ProjectCard  project={project} 
                        projectSelected={projectSelected} 
                        setProjectSelected={setProjectSelected}
                        redirectToProject={redirectToProject}
                        formActive={formActive}
                        setFormActive={setFormActive}
                        /> 
      ))}
    </div>
  )
}
