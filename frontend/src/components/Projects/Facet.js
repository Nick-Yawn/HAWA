import { useEffect, useState, useRef } from 'react';

import './Facet.css';

export default function Facet(props) {
  const { facet,
          type,
          links,
          setLinks,
          aFormActive,
          setAFormActive} = props;
  const [ formActive, setFormActive ] = useState(false);
  const [ name, setName ] = useState('');
  const formRef = useRef(null);
 
  // add this facet, if it exists to sidebar 
  useEffect(()=>{
    if( facet ) setLinks( prevLinks => [...prevLinks, facet.name] )
  },[])


  useEffect(()=>{
    if( !aFormActive ){
      setFormActive(false);
    }
  },[aFormActive])

  useEffect(()=>{
    if( formActive )
      formRef.current.focus();
  },[formActive])

  const showForm = e => {
    e.stopPropagation();
    setFormActive(true);
    setAFormActive(true);
  }

  const updateName = e => setName(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
  };


  if( facet ) return (
    <div className="facet-container">
      <div className="facet-header">
        <div className="facet-name">
        { facet.name }
        </div>
      </div>


    </div>
  ); else return (
    <div className="facet-container">
      <div className="facet-header facet-form" onClick={showForm}>
        {formActive || <div className="facet-name add-facet-label">+ Add a Feature</div> }
        {formActive && (
          <form onSubmit={handleSubmit}>
            <input  type="text"
                    ref={formRef}
                    value={name}
                    className="facet-input"
                    onChange={updateName}
            />
          </form>
        )}
      </div>

      
    </div>
  );
}
