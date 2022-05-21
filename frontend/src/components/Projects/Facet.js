import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { readProjects, postFeature, deleteFeature, editFeature } from '../../store/projects';
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
  const [ noInput, setNoInput ]       = useState(false);
  const [ linkIndex, setLinkIndex ]   = useState(null);
  const formRef = useRef(null);
  const editRef = useRef(null);

  // add this facet, if it exists to sidebar 
  useEffect(()=>{
    dispatch(readProjects());
    if( facet ) setLinks( prevLinks => { 
      setLinkIndex(prevLinks.length);
      return [...prevLinks, facet.name];
    })
  },[])


  useEffect(()=>{
    if( !aFormActive ){
      setFormActive(false);
      setEditActive(false);
      setNoInput(false);
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
      setNoInput(true);
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
      setNoInput(true);
      return
    }

    await dispatch(editFeature( {id: facet.id, name} ))

    setEditActive(false);
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
            <input  className="facet-input"
                    type="text"
                    ref={editRef}
                    value={name}
                    onChange={updateName}
                    onKeyDown={handleInputKeyDown}
                    />
          </form>
        }
        { noInput && ( 
          <div className="facet-name facet-error">
            Content is required.
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
            <input  type="text"
                    ref={formRef}
                    value={name}
                    onKeyDown={handleInputKeyDown}
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
