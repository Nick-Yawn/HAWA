import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouteForm } from './RouteForm';
import { deleteRoute } from '../../store/projects';
import './Facet.css';

export default function Route(props) {
  const {
          route,
          aFormActive,
          feature_id,
          setAFormActive
          } = props;
  const dispatch = useDispatch();
  const [ formActive, setFormActive ] = useState(false); 

  useEffect(()=>{
    if( !aFormActive ){
      setFormActive(false);
    }
  },[aFormActive])

  const handleDoubleClick = e => {
    setFormActive(true);
    setAFormActive(true);
  }

  const handleDelete = e => {
    dispatch(deleteRoute(route));
  }

  return (
      <div className="facet-header route-header"
            onDoubleClick={handleDoubleClick}>

        { formActive ||
          <>
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
          </>
        }

        {formActive && (
          <>
            <RouteForm  formActive={formActive}
                        aFormActive={aFormActive}
                        setFormActive={setFormActive}
                        setAFormActive={setAFormActive}
                        feature_id={feature_id}
                        route={route}
            />
            <button className="facet-button facet-delete" onClick={handleDelete}> Delete </button>
          </>
        )}
        
      </div> 
  );
}
