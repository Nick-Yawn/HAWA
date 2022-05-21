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
  return (totalWidth - 2 * x);

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
  const [ xoffset, setXOffset ]                     = useState(0);
  const projects      = useSelector(state => state.projects)

  const projectsArray = Object.values(projects);
  const projectsExist = projectsArray?.length > 0; 

  projectsArray.sort((a,b) => Date.parse(a.created_at) - Date.parse(b.created_at) );

  // initial read
  useEffect(() => {
    const func = async () => {
      await dispatch(readProjects())
      setLoadingComplete(true); 
    }
    func();
  }, [dispatch])

  // this is for centering the currently active card / form
  useEffect(()=>{
    if( formActive ){
      setXOffset(projectsArray.length * (200 + 25));
    } else if( selectedProjectId ){
      setXOffset(generateOffset(projectsArray, selectedProjectId));
    } else if( !selectedProjectId ){
      setXOffset(0);
    }
  },[formActive, selectedProjectId, editActive])

  // fired on ProjectCard exit animation end
  const redirectToProject = () => { 
    if( !formActive && !editActive || formSubmitted ) 
      history.push(`/projects/${selectedProjectId}`) 
  };

  // closes forms and unselects cards
  const handleBackgroundClick = e => { 
    if(projectExecuted) return;
    if(formActive) 
      setFormActive(false);
    if(editActive)
      setEditActive(false);
    else if(selectedProjectId)
      setSelectedProjectId(null);
  };

  // scroll function
  // this is counter-intuitive, but this works correctly
  const minOffset = generateOffset(projectsArray, projectsArray[projectsArray.length - 1]?.id || -1);
  const maxOffset = generateOffset(projectsArray, -1);
  const handleWheel = e => {
    if(!formActive && !editActive){
      setXOffset(prev => {
        const offset = prev - e.deltaY * 2.25 //225 pixels per event
        if( offset < minOffset ) return minOffset
        else if( offset > maxOffset ) return maxOffset
        else return offset
      })
    }
  }


  // classNames
  let className = "project-card-container";
  if( formSubmitted ) className += " project-card-container-freeze-animation" // fixes wiggle on submit

  // the first card is not provided a project prop and therefore becomes the new project form
  if( !loadingComplete ){
    return null
  } else {
    return (
      <div  onClick={handleBackgroundClick}
            onWheel={handleWheel}
            className="projects-bg">
        <div  className={className} 
              style={{marginLeft: xoffset + "px"}}>
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
            projectsArray.map((project, i) => 
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
