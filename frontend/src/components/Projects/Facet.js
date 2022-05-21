import { useEffect } from 'react';

export default function Facet({ facet, type, links, setLinks }) {

  // separate facet-form component, later  
 
  // add this facet to sidebar 
  useEffect(()=>{
    setLinks( prevLinks => [...prevLinks, facet.title] )
  },[])

  return (
    <div className="facet-container">
      <div className="facet-header">
        { facet.title }
      </div>
    </div>
  );
}
