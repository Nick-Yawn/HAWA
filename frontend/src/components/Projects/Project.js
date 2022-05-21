import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Facet from './Facet';

import './Project.css';

export default function Project() {
  const { project_id } = useParams();
  let project = useSelector( state => state.projects[+project_id] );
  if( project == undefined ) project = {title:'test project', features:[
    {name:'first feature'},
    {name:'second feature'}
  ] };
  // state slice holds sidebar links, each first render of facet adds to links
  const [ links, setLinks ] = useState([]);
 
  const features = project.features;
  features.sort( (a,b) => Date.parse(a.created_at) - Date.parse(b.created_at) ); 

  return (
    <CSSTransition  in={true}
                    appear={true}
                    timeout={1000}
                    classNames={"project-page"}>
      <div className="sidebar-and-main-container">
        <div className="project-sidebar">
          {links.map(link => 
            <div className={`sidebar-link ${link.className}`}>{link}</div>
          )}
        </div>
        <div className="project-main">
          { features.map( feature => (
            <Facet facet={feature} setLinks={setLinks} />
          ))}
        </div>
      </div>
    </CSSTransition>
  );
}
