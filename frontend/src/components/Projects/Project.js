import { useEffect, useState } from 'react';
//import { useParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import './Project.css';

export default function Project() {
//  const {project_id} = useParams();
  
  // state slice holds sidebar links, each first render of facet adds to links
  const [ links, setLinks ] = useState([]);
  

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
          
        </div>
      </div>
    </CSSTransition>
  );
}
