import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { readProjects, postFeature } from '../../store/projects';
import { useParams } from 'react-router-dom';

import './Facet.css';

export default function Facet(props) {
  const { facet,
          type,
          links,
          setLinks,
          aFormActive,
          setAFormActive} = props;
  const dispatch = useDispatch();
  const project_id = +useParams().project_id
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

  const handleSubmit = async e => {
    e.preventDefault();
    if( name.trim() === '' ){
      setNoInput(true);
      return;
    }
    const newFeature = await dispatch(postFeature( {name, project_id} ))

    if( newFeature.id ){
      setName('');
    }
  };


  if( facet ) return (
    <div className="facet-container">
      <div className="facet-header">
        <div className="facet-name">
        { facet.name }
        </div>
        <div className="facet-name"> Edit </div>
        <div className="facet-name"> Delete </div>
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
