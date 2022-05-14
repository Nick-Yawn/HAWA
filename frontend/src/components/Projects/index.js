import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import { readProjects } from '../../store/projects';

import './Projects.css'

export default function Projects() {
  const dispatch = useDispatch();
  const history  = useHistory();
  const [ selectedProjectId, setSelectedProjectId] = useState(null);
  const [ projectExecuted, setProjectExecuted ] = useState(false);
  const [ formActive, setFormActive ] = useState(false);
  const projects = useSelector(state => state.projects)
  const projectsExist = projects?.length > 0; 

  useEffect(()=> {
    dispatch(readProjects())
  }, [dispatch])

  const redirectToProject = () => {
    if( !formActive )
      history.push(`/projects/${selectedProjectId}`)
  };

  // this is for centering the currently active card
  let xoffset = "0px";
  if( formActive ){
    xoffset = projects.length * ( 200 + 25 ) + "px"; 
  } else if( selectedProjectId ){
    const n = projects?.length;
    const w = 200; // card width
    const g = 25;  // gap
    const i = projects.findIndex( project => project.id === selectedProjectId);
    const totalWidth = ( ( n + 1 ) * w + n * g );
    const x = ( w + g ) * ( i + 1 ) + w / 2;
    xoffset = (totalWidth - 2 * x) + "px";
  }

  console.log(xoffset);

  // the first card is not provided a project prop and therefore becomes the new project form
  return (
    <div  className="project-card-container"
      style={{marginLeft: xoffset}}>
      <ProjectCard  selectedProjectId={selectedProjectId} 
                    setSelectedProjectId={setSelectedProjectId}
                    redirectToProject={redirectToProject}
                    formActive={formActive}
                    setFormActive={setFormActive}
                    projectExecuted={projectExecuted}
                    setProjectExecuted={setProjectExecuted}
                    />
      {projectsExist && (
        projects.map(project => 
          <ProjectCard  project={project} 
                        selectedProjectId={selectedProjectId} 
                        setSelectedProjectId={setSelectedProjectId}
                        redirectToProject={redirectToProject}
                        formActive={formActive}
                        setFormActive={setFormActive}
                        projectExecuted={projectExecuted}
                        setProjectExecuted={setProjectExecuted}
                        /> 
      ))}
    </div>
  )
}
