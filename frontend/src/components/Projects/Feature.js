import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { postFeature, deleteFeature, editFeature } from '../../store/projects';
import { useParams } from 'react-router-dom';
import Route from './Route';
import RouteFormWrapper from './RouteForm';
import UserStory from './UserStory';
import UserStoryFormWrapper from './UserStoryForm';


import './Facet.css';

export default function Feature(props) {
  const { feature,
          links,
          aFormActive,
          setAFormActive} = props;
  const dispatch = useDispatch();
  const project_id = +useParams().project_id
  const [ editActive, setEditActive ] = useState(false);
  const [ name, setName ]             = useState('');
  const [ error, setError ]           = useState(false);
  const [ linkIndex, setLinkIndex ]   = useState(null);
  const editRef = useRef(null);

  const routes = Object.values(feature.routes);
  routes.sort((a,b) => {
    if( a.type != b.type ){
      if( a.type === "Front-End" )
        return -1
      else 
        return 1
    } else {
      return Date.parse(a.created_at) - Date.parse(b.created_at)
    }
  });

  const userStories = Object.values(feature.user_stories);
  userStories.sort( (a,b) => Date.parse(a.created_at) - Date.parse(b.created_at) );

  useEffect(()=>{
    if( error )
      if( name.trim() !== '' && name.length <= 80 )
        setError(null)
  },[name, error])

  useEffect(()=>{
    if( !aFormActive ){
      setEditActive(false);
      setError(null);
      setName('');
    }
  },[aFormActive]) 

  useEffect(()=>{
    if( editActive && editRef.current ){
      editRef.current.focus();
      setName(feature.name);
    }
  },[editActive])

  const showEdit = e => {
    e.stopPropagation();
    setEditActive(true);
    setAFormActive(true);
  }

  const updateName = e => setName(e.target.value);

  const stopTheProp = e => e.stopPropagation();

  const handleDelete = async e => {
    e.preventDefault();
    await dispatch(deleteFeature(feature?.id));
  }

  const handleInputKeyDown = e => {
    if( e.key === "Escape" ){
      setEditActive(false);
    }
  }

  const handleDoubleClick = e => {
    showEdit(e);
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
    await dispatch(editFeature( {id: feature.id, name} ))
    setEditActive(false);
  }


  return (
    <div id={`feature-${feature.id}`} className="facet-container">
      <div className="facet-header">
        {editActive ||
          <div className="facet-name" onDoubleClick={handleDoubleClick}>
            { feature.name }
          </div>
        }
        {editActive &&
          <form className="facet-form"
                onSubmit={handleEdit}
                onClick={stopTheProp}>
            <div className="facet-resizeable-input-container">
              <div className="form-resizer">{name.replaceAll(' ', '\xa0')}</div>
              <input  className={"facet-input " + (name.length > 80 ? "bad-input" : "")}
                      type="text"
                      ref={editRef}
                      value={name}
                      onChange={updateName}
                      onKeyDown={handleInputKeyDown}
                    />
              </div>
          </form>
        }
        { error && ( 
          <div className="facet-name facet-error">
            {error}
          </div>
        )}
        {editActive && 
          <>
            <button className="facet-button" onClick={handleEdit}> Submit </button>
            <button className="facet-button facet-delete" onClick={handleDelete}> Delete </button>
          </>
        }
      </div> 
      {routes.map( (route, i) => ( 
        <Route  route={route} 
                key={i}
                aFormActive={aFormActive}
                feature_id={feature.id}
                setAFormActive={setAFormActive}/>
      ))}
      <RouteFormWrapper  setAFormActive={setAFormActive}
                  aFormActive={aFormActive} 
                  feature_id={feature.id}/>

      {userStories.map( (story, i) => (
        <UserStory  userStory={story} 
                    aFormActive={aFormActive}
                    feature_id={feature.id}
                    setAFormActive={setAFormActive}
                    key={i}/>
      ))}
      <UserStoryFormWrapper setAFormActive={setAFormActive}
                  aFormActive={aFormActive} 
                  feature_id={feature.id}/>
    </div>
  );
}
