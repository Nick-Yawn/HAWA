import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { UserStoryForm } from './UserStoryForm';
import { deleteUserStory } from '../../store/projects';

export default function UserStory(props){
  const {
          userStory,
          aFormActive,
          feature_id,
          setAFormActive
        } = props;
  const dispatch = useDispatch();
  const [ formActive, setFormActive ] = useState(false); 

  useEffect(()=>{
    if( !aFormActive ){
      setFormActive(false);
    }
  },[aFormActive])

  const handleDoubleClick = e => {
    setFormActive(true);
    setAFormActive(true);
  }

  const handleDelete = e => {
    dispatch(deleteUserStory(userStory));
  }

  return(
    <div className="facet-header user-story-header route-header"
            onDoubleClick={handleDoubleClick}>
      { formActive ||
        <>
          <div className="facet-name user-story-operation">
            {userStory.operation}
          </div>
          <div className="facet-name">
            {userStory.story}
          </div>
        </>
      }

        {formActive && (
          <>
            <UserStoryForm  formActive={formActive}
                            aFormActive={aFormActive}
                            setFormActive={setFormActive}
                            setAFormActive={setAFormActive}
                            feature_id={feature_id}
                            userStory={userStory}
            />
            <button className="facet-button facet-delete" onClick={handleDelete}> Delete </button>
          </>
        )}

    </div>
  )
}
