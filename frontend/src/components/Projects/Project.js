import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { readProjects } from '../../store/projects';
import Feature from './Feature';
import FeatureForm from './FeatureForm';
import ConversionsModal from './Conversions';

import './Project.css';



export default function Project({ setProject }) {
  const dispatch = useDispatch();
  const { project_id } = useParams();
  const history = useHistory();
  const project = useSelector( state => state.projects[+project_id] );
  const [ showConversions, setShowConversions ] = useState(false);
  const [ aFormActive, setAFormActive ] = useState(false);
  const [ isLoaded, setIsLoaded ] = useState(false);
  const [ formLinkActive, setFormLinkActive ] = useState(false);

  useEffect(()=>{
    const func = async () => {
      await dispatch(readProjects());
      setIsLoaded(true);
    }
    func();
  },[])
  
  setProject(project);

  const features = Object.values(project?.features || {});
  features.sort( (a,b) => Date.parse(a.created_at) - Date.parse(b.created_at) ); 

  const openConversions = e => {
    setShowConversions(true);
  };

  const handleBGClick = e => {
    setAFormActive(false);
    setFormLinkActive(false);
  }

  const updateFormLink = e => {
    setFormLinkActive(true);
  }

  if( isLoaded && project === undefined ){
    return (<Redirect to='/projects' />);
  }

  return (
    <CSSTransition  in={true}
                    appear={true}
                    timeout={1000}
                    classNames={"project-page"}>
      <div className="sidebar-and-main-container">
        <div className="project-sidebar">
          <div className="sidebar-spacer" />
          <div className="sidebar-links">
            <span id="sidebar-links-label">Jump to:</span>
            {features.map( (feature,i) => (
              <a href={`#feature-${feature.id}`} key={i} className="sidebar-link">{feature.name}</a>
            ))} 
            <a href="#feature-form" className="sidebar-link" onClick={updateFormLink}>+ Add a Feature</a>
          </div>          
          <button onClick={openConversions} id="export-button">Export</button>
        </div>
        <div className="project-main" onClick={handleBGClick}>
          { features.map( (feature, i) => (
            <Feature  feature={feature} 
                      aFormActive={aFormActive}
                      key={i}
                      setAFormActive={setAFormActive}/>
          ))}
          <FeatureForm  formLinkActive={formLinkActive}
                        setFormLinkActive={setFormLinkActive}
                        setAFormActive={setAFormActive}
                        aFormActive={aFormActive}/>
        </div>
        { showConversions && <ConversionsModal setShowConversions={setShowConversions} project_id={project_id} /> }
      </div>
    </CSSTransition>
  );
}
