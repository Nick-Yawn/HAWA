import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { postFeature, deleteFeature, editFeature } from '../../store/projects';
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
  const [ editActive, setEditActive ] = useState(false);
  const [ name, setName ]             = useState('');
  const [ error, setError ]           = useState(false);
  const [ linkIndex, setLinkIndex ]   = useState(null);
  const formRef = useRef(null);
  const editRef = useRef(null);

  // add this facet, if it exists to sidebar 
  useEffect(()=>{
    if( facet ) setLinks( prevLinks => { 
      setLinkIndex(prevLinks.length);
      return [...prevLinks, facet.name];
    })
  },[])


  useEffect(()=>{
    if( !aFormActive ){
      setFormActive(false);
      setEditActive(false);
      setError(null);
      setName('');
    }
  },[aFormActive])

  useEffect(()=>{
    if( formActive )
      formRef.current.focus();
  },[formActive])

  useEffect(()=>{
    if( editActive ){
      editRef.current.focus();
      setName(facet.name)
    }
  },[editActive])

  const showForm = e => {
    e.stopPropagation();
    setFormActive(true);
    setAFormActive(true);
  }

  const showEdit = e => {
    e.stopPropagation();
    setEditActive(true);
    setAFormActive(true);
    if( editRef.current )
      editRef.current.focus();
  }

  const updateName = e => setName(e.target.value);

  const stopTheProp = e => e.stopPropagation();

  const handleDelete = async e => {
    e.preventDefault();
    
    await dispatch(deleteFeature(facet?.id));

    setLinks(prevLinks => {
      prevLinks.splice(linkIndex, 1);
      return [...prevLinks];
    })
  }

  const handleInputKeyDown = e => {
    if( e.key === "Escape" ){
      setFormActive(false);
      setEditActive(false);
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
    }
  };

  const handleEdit = async e => {
    e.preventDefault();
    if( name.trim() === '' ){
      setError("Name is required.");
      return
    } else if( name.length > 80 ){
      setError("Name must be less than 80 characters.")
      return;
    }
    await dispatch(editFeature( {id: facet.id, name} ))
    setEditActive(false);
    setLinks(prevLinks => {
      prevLinks.splice(linkIndex, 1, name);
      return [...prevLinks];
    })
  }


  if( facet ) return (
    <div className="facet-container">
      <div className="facet-header">
        {editActive ||
          <div className="facet-name">
            { facet.name }
          </div>
        }
        {editActive &&
          <form className="facet-form"
                onSubmit={handleEdit}
                onClick={stopTheProp}>
            <div className="form-resizer">{name}</div>
            <input  className={"facet-input " + (name.length > 80 ? "bad-input" : "")}
                    type="text"
                    ref={editRef}
                    value={name}
                    onChange={updateName}
                    onKeyDown={handleInputKeyDown}
                    />
          </form>
        }
        { error && ( 
          <div className="facet-name facet-error">
            {error}
          </div>
        )}
        <button className="facet-button" onClick={showEdit}> Edit </button>
        <button className="facet-button facet-delete" onClick={handleDelete}> Delete </button>
      </div>
      
    </div>
  ); else return (
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
            <div className="form-resizer">{name}</div>
            <input  type="text"
                    ref={formRef}
                    value={name}
                    onKeyDown={handleInputKeyDown}
                    className={"facet-input " + (name.length > 80 ? "bad-input" : "")}
                    onChange={updateName}
            />
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
