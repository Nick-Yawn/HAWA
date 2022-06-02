import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { postUserStory, putUserStory } from '../../store/projects';

export default function UserStoryFormWrapper(props) {
  const { setAFormActive, aFormActive, feature_id } = props;
  const [ formActive, setFormActive] = useState(false);

  const showForm = e => {
    e.stopPropagation();
    setFormActive(true);
    setAFormActive(true);
  }
  
  const handleAddButtonKeyDown = e => {
    if( e.key === 'Enter' ){
      e.target.click();
    }
  }; 

  return ( 
    <div className="facet-header route-header">
      { formActive ||
        <div  className="facet-name add-facet-label add-route-label"
              onClick={showForm}
              tabIndex="0"
              onKeyDown={handleAddButtonKeyDown}>
          + Add User Stories
        </div>
      }
      { formActive && 
        <UserStoryForm  aFormActive={aFormActive}
                        setFormActive={setFormActive}
                        formActive={formActive}
                        setFormActive={setFormActive}
                        feature_id={feature_id}
        />
      }
    </div>

  );
}

export function UserStoryForm(props) {
  const {
          formActive,
          aFormActive,
          setFormActive,
          setAFormActive,
          feature_id,
          userStory
        } = props;
  const dispatch = useDispatch();
  const project_id = +useParams().project_id;
  const [ story, setStory ]         = useState('');
  const [ operation, setOperation ] = useState('CREATE');
  const [ error, setError ]         = useState(null);
  const opRef = useRef(null);
  const storyRef = useRef(null);
  const id = userStory?.id;

  useEffect(()=>{
    if( !aFormActive ){
      setFormActive(false);
      setError(null);
      setStory('');
    }
  },[aFormActive]);

  useEffect(()=>{
    if( formActive && !userStory )
      opRef.current.focus();
    if( userStory ){
      setOperation( userStory.operation || '');
      setStory(userStory.story || '');
    }
  },[formActive])

  const nextOperation = op => {
    switch(op){
      case 'CREATE':
        return 'READ';
      case 'READ':
        return 'UPDATE';
      case 'UPDATE':
        return 'DELETE';
      case 'DELETE':
        return 'CREATE';
      default:
        return '';
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if( story.trim() === '' ){
      setError("Story is required.");
      return;
    } else if( story.length > 280 ){
      setError("Story is limited to 280 characters. But you're just messing around, aren't you?");
      return;
    }

    if( userStory ){
      const editedUserStory = await dispatch(putUserStory({
        story: story.trim(),
        operation,
        project_id,
        feature_id,
        id
      }));
      
      if( editedUserStory ){
        setAFormActive(false);
      }

    } else {
      const newUserStory = await dispatch(postUserStory({
        story: story.trim(),
        operation,
        project_id,
        feature_id,
        id
      }));

      if( newUserStory ){
        if( story.split(',')[0].toLowerCase().startsWith('as') )
          setStory(story.split(',')[0] + ', ');
        else
          setStory('');
        setOperation(nextOperation(operation));
        storyRef.current.focus();
      }
    }
  }  

  const handleOpKeyDown = e => {
    if( e.key === 'Enter' )
      e.stopPropagation();
  }
 
  const handleTextInputKeyDown = e => {
    if( e.key === 'Escape' ){
      setFormActive(false);
      setError(null);
      setStory('');
    } else if( e.key === 'Enter' ){
      handleSubmit(e);
    }
  }

  const updateOp    = e => setOperation(e.target.value);
  const updateStory = e => setStory(e.target.value);

  const stopTheProp = e => e.stopPropagation();

  return (
    <form className="facet-form"
          onClick={stopTheProp}
          onSubmit={handleSubmit}>
       
      <select ref={opRef} value={operation} onChange={updateOp} onKeyDown={handleOpKeyDown}>
        <option>CREATE</option>
        <option>READ</option>
        <option>UPDATE</option>
        <option>DELETE</option>
        <option></option>
      </select>

      <div className="facet-resizeable-input-container route-input-container">
        <div className="form-resizer">{story}</div>
        <input  type="text"
                ref={storyRef}
                value={story}
                onKeyDown={handleTextInputKeyDown}
                onChange={updateStory}
                placeholder="As a ____, I can ____, so that ____"
                className={"facet-input user-story-story-input " + (story.length > 280 ? "bad-input" : "")}
        />
      </div>

      { error && (
        <div className="facet-name facet-error">
          {error}
        </div>
      )} 
      
      <button className="facet-button" onClick={handleSubmit}> Submit </button>
        
    </form>
  );
}
