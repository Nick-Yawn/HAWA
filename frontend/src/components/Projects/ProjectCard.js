import './ProjectCard.css'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

// this component is either simply a link to the single project page, or a form to create a new project

export default function ProjectCard(props) {
  const { project, projectSelected, setProjectSelected, redirectToProject, formActive, setFormActive } = props;
  const history = useHistory();
  const [ selectedCardIsThisCard, setSelectedCardIsThisCard ] = useState(false);
  const isCreateCard = project === undefined;

  const action = e => {
    if( isCreateCard ){
      setFormActive(!formActive);
    } else {
      setSelectedCardIsThisCard(true);
      setProjectSelected(project.id);
    }
  }

  const className = formActive && isCreateCard ? "project-card project-card-active" : "project-card";

  return (
    <CSSTransition  in={(!projectSelected && !formActive) || (isCreateCard && formActive)} 
                    timeout={500} 
                    onExited={redirectToProject} 
                    classNames={selectedCardIsThisCard ? "selected-project" : "project-card"}>
      <div className={className} onClick={action}>
        {project?.title || "Start a Project"}
      </div>
    </CSSTransition>
  )
}
