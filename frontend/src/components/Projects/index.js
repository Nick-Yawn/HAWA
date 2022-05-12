import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProjectCard from './ProjectCard';
import { readProjects } from '../../store/projects';

import './Projects.css'

export default function Projects() {
  const dispatch = useDispatch();
  const projects = useSelector(state => state.projects)
  const projectsExist = projects?.length > 0; 

  useEffect(()=> {
    dispatch(readProjects())
  }, [dispatch])

  return (
    <div className="project-card-container">
      <ProjectCard />
      {projectsExist && (
        projects.map(project => <ProjectCard project={project} /> )
      )}
    </div>
  )
}
