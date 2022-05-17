import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import { readProjects } from '../../store/projects';

import './Projects.css'

const generateOffset = (projects, selectedProjectId) => {
  const n = projects?.length;
  const w = 200; // card width
  const g = 25;  // gap
  const i = projects.findIndex( project => project.id === selectedProjectId);
  const totalWidth = ( ( n + 1 ) * w + n * g );
  const x = ( w + g ) * ( i + 1 ) + w / 2;
  return (totalWidth - 2 * x) + "px";

}

export default function Projects() {
  const dispatch = useDispatch();
  const history  = useHistory();
  const [ selectedProjectId, setSelectedProjectId]  = useState(null);
  const [ projectExecuted, setProjectExecuted ]     = useState(false);
  const [ formActive, setFormActive ]               = useState(false);
  const [ editActive, setEditActive ]               = useState(false);
  const [ formSubmitted, setFormSubmitted ]         = useState(false);
  const [ loadingComplete, setLoadingComplete ]     = useState(false);
  const projects      = useSelector(state => state.projects)
  const projectsExist = projects?.length > 0; 

  useEffect(() => {
    const func = async () => {
      await dispatch(readProjects())
      setLoadingComplete(true); 
    }
    func();
  }, [dispatch])

  const redirectToProject = () => { 
    if( !formActive && !editActive || formSubmitted ) 
      history.push(`/projects/${selectedProjectId}`) 
  };

  // this is for centering the currently active card
  let xoffset = "0px";
  if( formActive ){
    xoffset = projects.length * ( 200 + 25 ) + "px"; 
  } else if( selectedProjectId ){
    xoffset = generateOffset(projects, selectedProjectId);
  } else if( !selectedProjectId ){
    xoffset = generateOffset(projects, -1); //TODO: make this last edited project
  }

  const handleBackgroundClick = e => { 
    if(formActive) 
      setFormActive(false);
    if(editActive)
      setEditActive(false);
    //if(selectedProjectId)
      //setSelectedProjectId(null);
  };

  let className = "project-card-container";
  if( formActive || editActive )    className += " project-card-container-form-active"  // for cursor:hover on bg
  if( formSubmitted ) className += " project-card-container-freeze-animation" // fixes wiggle on submit

  // the first card is not provided a project prop and therefore becomes the new project form
  if( !loadingComplete ){
    return null
  } else {
    return (
      <div  onClick={handleBackgroundClick}
            className="projects-bg">
      <div  className={className} 
            style={{marginLeft: xoffset}}>
        <ProjectCard  selectedProjectId={selectedProjectId} 
                      setSelectedProjectId={setSelectedProjectId}
                      redirectToProject={redirectToProject}
                      formActive={formActive}
                      setFormActive={setFormActive}
                      projectExecuted={projectExecuted}
                      setProjectExecuted={setProjectExecuted}
                      formSubmitted={formSubmitted}
                      setFormSubmitted={setFormSubmitted}
                      editActive={editActive}
                      setEditActive={setEditActive}
                      />
        {projectsExist && (
          projects.map((project, i) => 
            <ProjectCard  project={project} 
                          selectedProjectId={selectedProjectId} 
                          setSelectedProjectId={setSelectedProjectId}
                          redirectToProject={redirectToProject}
                          formActive={formActive}
                          setFormActive={setFormActive}
                          projectExecuted={projectExecuted}
                          setProjectExecuted={setProjectExecuted}
                          editActive={editActive}
                          setEditActive={setEditActive}
                          key={i}
                          /> 
        ))}
      </div>
      </div>
    )
  }
}
