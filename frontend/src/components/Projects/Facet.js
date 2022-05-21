import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { readProjects } from '../../store/projects';

import './Facet.css';

export default function Facet(props) {
  const { facet,
          type,
          links,
          setLinks,
          aFormActive,
          setAFormActive} = props;
  const dispatch = useDispatch();
  const [ formActive, setFormActive ] = useState(false);
  const [ name, setName ]             = useState('');
  const [ noInput, setNoInput ]       = useState(false);
  const formRef = useRef(null);
 
  // add this facet, if it exists to sidebar 
  useEffect(()=>{
    dispatch(readProjects());
    if( facet ) setLinks( prevLinks => [...prevLinks, facet.name] )
  },[])


  useEffect(()=>{
    if( !aFormActive ){
      setFormActive(false);
      setNoInput(false);
      setName('');
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

  const stopTheProp = e => e.stopPropagation();

  const handleSubmit = e => {
    e.preventDefault();
    if( name.trim() === '' ){
      setNoInput(true);
      return;
    }
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
      <div className="facet-header">
        {formActive || 
          <div  onClick={showForm} 
                className="facet-name add-facet-label">
            + Add a Feature
          </div>
        }
        {formActive && (
          <form className="facet-form" 
                onSubmit={handleSubmit}
                onClick={stopTheProp}>
            <input  type="text"
                    ref={formRef}
                    value={name}
                    className="facet-input"
                    onChange={updateName}
            />
          </form>
        )}

      { noInput && ( 
        <div className="facet-name facet-error">
          Content is required.
        </div>
      )}
      </div>
    </div>
  );
}
