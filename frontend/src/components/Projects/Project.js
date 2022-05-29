import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { readProjects } from '../../store/projects';
import Feature from './Feature';
import FeatureForm from './FeatureForm';

import './Project.css';

export default function Project() {
  const dispatch = useDispatch();
  const { project_id } = useParams();
  const history = useHistory();
  const project = useSelector( state => state.projects[+project_id] );
  const [ links, setLinks ] = useState([]);
  const [ aFormActive, setAFormActive ] = useState(false);
  const [ isLoaded, setIsLoaded ] = useState(false)

  useEffect(()=>{
    const func = async () => {
      await dispatch(readProjects());
      setIsLoaded(true);
    }
    func();
  },[])
 
  const features = Object.values(project?.features || {});
  features.sort( (a,b) => Date.parse(a.created_at) - Date.parse(b.created_at) ); 

  const redirectToConversions = e => history.push(`/projects/${project_id}/conversions`);

  const handleBGClick = e => {
    setAFormActive(false);
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
          {/*links.map(link => 
            <div className={`sidebar-link ${link.className}`}>{link}</div>
          )*/}
          <button onClick={redirectToConversions} className="export-button">Export</button>
        </div>
        <div className="project-main" onClick={handleBGClick}>
          { features.map( (feature, i) => (
            <Feature  feature={feature} 
                      aFormActive={aFormActive}
                      key={i}
                      setAFormActive={setAFormActive}
                      setLinks={setLinks} />
          ))}
          <FeatureForm  setLinks={setLinks}
                        setAFormActive={setAFormActive}
                        aFormActive={aFormActive}/>
        </div>
      </div>
    </CSSTransition>
  );
}
