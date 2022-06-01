import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { postFeature, deleteFeature, editFeature } from '../../store/projects';
import { useParams } from 'react-router-dom';

import './Facet.css';

export default function FeatureForm(props) { 
  const { 
          setLinks,
          aFormActive,
          setAFormActive} = props;
  const dispatch = useDispatch();
  const project_id = +useParams().project_id
  const [ formActive, setFormActive ] = useState(false);
  const [ name, setName ]             = useState('');
  const [ error, setError ]           = useState(false);
  const formRef = useRef(null);
  
  useEffect(()=>{
    if( formActive )
      formRef.current.focus();
  },[formActive])

  useEffect(()=>{
    if( !aFormActive ){
      setFormActive(false);
      setError(null);
      setName('');
    }
  },[aFormActive])

  const showForm = e => {
    e.stopPropagation();
    setFormActive(true);
    setAFormActive(true);
  }

  const handleInputKeyDown = e => {
    if( e.key === "Escape" ){
      setFormActive(false);
    }
  }

  const handleAddButtonKeyDown = e => {
    if( e.key === "Enter" ){
      e.target.click();
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if( name.trim() === '' ){
      setError("Name is required.");
      return;
    } else if( name.length > 80 ){
      setError("Name must be less than 80 characters.")
      return;
    }
    const newFeature = await dispatch(postFeature( {name, project_id} ))

    if( newFeature.id ){
      setName('');
      formRef.current.scrollIntoView();
    }
  };

  const updateName = e => setName(e.target.value);
  const stopTheProp = e => e.stopPropagation();

  return (
    <div className="facet-container">
      <div className="facet-header">
        {formActive || 
          <div  onClick={showForm}
                tabIndex="0"
                onKeyDown={handleAddButtonKeyDown}
                className="facet-name add-facet-label">
            + Add a Feature
          </div>
        }
        {formActive && (
          <form className="facet-form" 
                onSubmit={handleSubmit}
                onClick={stopTheProp}>
            <div className="facet-resizeable-input-container">
              <div className="form-resizer">{name.replaceAll(' ', '\xa0')}</div>
              <input  type="text"
                      ref={formRef}
                      value={name}
                      onKeyDown={handleInputKeyDown}
                      className={"facet-input " + (name.length > 80 ? "bad-input" : "")}
                      onChange={updateName}
              />
            </div>
            <button className="facet-button" onClick={handleSubmit}> Submit </button>
          </form>
        )}

        { error && ( 
          <div className="facet-name facet-error">
            {error}
          </div>
        )}
      </div>
    </div>
  );
  
}
