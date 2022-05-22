import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { readProjects } from '../../store/projects';
import Facet from './Facet';

import './Project.css';

export default function Project() {
  const dispatch = useDispatch();
  const { project_id } = useParams();
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
 
  const features = project?.features;
  if( features )
    features.sort( (a,b) => Date.parse(a.created_at) - Date.parse(b.created_at) ); 

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
        </div>
        <div className="project-main" onClick={handleBGClick}>
          { features?.map( feature => (
            <Facet  facet={feature} 
                    aFormActive={aFormActive}
                    setAFormActive={setAFormActive}
                    setLinks={setLinks} />
          ))}
          <Facet  setLinks={setLinks}
                  setAFormActive={setAFormActive}
                  aFormActive={aFormActive}/>
        </div>
      </div>
    </CSSTransition>
  );
}
