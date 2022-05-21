import { useEffect } from 'react';

import './Facet.css';

export default function Facet({ facet, type, links, setLinks }) {

  // separate facet-form component, later  
 
  // add this facet to sidebar 
  useEffect(()=>{
    setLinks( prevLinks => [...prevLinks, facet.name] )
  },[])

  return (
    <div className="facet-container">
      <div className="facet-header">
        { facet.name }
      </div>
    </div>
  );
}
