
import './Facet.css';

export default function Route({route}) {


  return (
      <div className="facet-header route-header">
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
      </div> 
  );
}
