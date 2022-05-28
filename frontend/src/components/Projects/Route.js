import { useState, useEffect } from 'react';
import './Facet.css';

export default function Route(props) {
  const {
          route,
          aFormActive,
          setAFormActive
          } = props;
  const [ editActive, setEditActive ] = useState(false); 

  useEffect(()=>{
    if( !aFormActive ){
      setEditActive(false);
    }
  },[aFormActive])

  const handleDoubleClick = e => {
    setEditActive(!editActive);
    setAFormActive(true);
  }

  const handleDelete = e => {}

  return (
      <div className="facet-header route-header"
            onDoubleClick={handleDoubleClick}>


        <div className={`facet-name route-type route-${route.type}`}>
          {route.type} 
        </div> 
        {route.method && (
          <div className="facet-name route-method">
            {route.method}       
          </div> 
        )}
        <div className="facet-name route-path">
          {route.path}       
        </div>
        {route.label && (
          <div className="facet-name route-label">
            {route.label}  
          </div> 
        )}
        
        {editActive && <button className="facet-button facet-delete" onClick={handleDelete}> Delete </button>}
        
      </div> 
  );
}
