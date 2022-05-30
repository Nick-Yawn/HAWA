
// PROJECTS

const GET_PROJECTS    = 'projects/GET_PROJECTS'
const POST_PROJECT    = 'projects/POST_PROJECT'
const DELETE_PROJECT  = 'projects/DELETE_PROJECT'
const EDIT_PROJECT    = 'projects/EDIT_PROOJECT'
const CLEAR_PROJECTS  = 'projects/CLEAR_PROJECTS'

const getProjectsAction = projects => ({
  type: GET_PROJECTS,
  projects
});

const postProjectAction = project => ({
  type: POST_PROJECT,
  project
});

const deleteProjectAction = project => ({
  type: DELETE_PROJECT,
  project
});

const editProjectAction = project => ({
  type: EDIT_PROJECT,
  project
})

const clearProjectsAction = () => ({
  type: CLEAR_PROJECTS
})

export const clearProjects = () => async dispatch => {
  await dispatch(clearProjectsAction());
}

export const readProjects = () => async dispatch => {
  const response = await fetch('/api/projects/');

  const data = await response.json();

  if( response.ok ){
    await dispatch(getProjectsAction(data.projects));
    return data.projects;
  } else {
    console.log(data.errors);
  }
} 

export const postProject = project => async dispatch => {
  const response = await fetch('/api/projects/', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(project)
  })

  const data = await response.json();

  if( response.ok ){
    await dispatch(postProjectAction(data));
    return data;
  } else {
    console.log(data.errors);
    return {id: null};
  }
}

export const editProject = project => async dispatch => {
  const response = await fetch(`/api/projects/${project.id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(project)
  })

  const data = await response.json();

  if( response.ok ){
    await dispatch(editProjectAction(data));
    return data.title;
  } else {
    console.log(data.errors);
    return "Update Unsuccessful";
  }
}

export const deleteProject = projectId => async dispatch => {
  const response = await fetch(`/api/projects/${projectId}`,{
    method: 'DELETE'
  })

  const data = await response.json();

  if( response.ok ){
    await dispatch(deleteProjectAction(data));
    return data;
  } else {
    console.log(data.errors);
  }
}

// FEATURES

const POST_FEATURE    = 'features/POST_FEATURE';
const DELETE_FEATURE  = 'features/DELETE_FEATURE';
const EDIT_FEATURE    = 'features/EDIT_FEATURE';

const postFeatureAction = feature => ({
  type: POST_FEATURE,
  feature
})

const deleteFeatureAction = feature => ({
  type: DELETE_FEATURE,
  feature
})

const editFeatureAction = feature => ({
  type: EDIT_FEATURE,
  feature
})

export const postFeature = feature => async dispatch => {
  const response = await fetch(`/api/projects/${feature.project_id}/features`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(feature)
  })

  const data = await response.json();

  if( response.ok ){
    await dispatch(postFeatureAction(data));
    return data;
  } else {
    console.log(data.errors);
    return {id: null};
  }
  
}

export const deleteFeature = featureId => async dispatch => {
  const response = await fetch(`/api/features/${featureId}`,{
    method: 'DELETE'
  });

  const data = await response.json();

  if( response.ok ){
    await dispatch(deleteFeatureAction(data));
    return data;
  } else {
    console.log(data.errors);
  }
}

export const editFeature = feature => async dispatch => {
  const response = await fetch(`/api/features/${feature.id}`,{
    method: 'PUT',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(feature)
  })

  const data = await response.json();

  if( response.ok ){
    await dispatch(editFeatureAction(data));
    return data;
  } else {
    console.log(data.errors);
  }
}

// ROUTES
const POST_ROUTE    = 'routes/POST_ROUTE'
const DELETE_ROUTE  = 'routes/DELETE_ROUTE'

const postRouteAction = route => ({
  type: POST_ROUTE,
  route
})

const deleteRouteAction = route => ({
  type: DELETE_ROUTE,
  route
})

export const postRoute = route => async dispatch => {
  const response = await fetch(`/api/features/${route.feature_id}/routes`,{
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(route)
  })

  const data = await response.json();

  if( response.ok ){
    await dispatch(postRouteAction(data));
    return data;
  } else {
    console.log(data.errors);
  }
}

export const putRoute = route => async dispatch => {
  const response = await fetch(`/api/routes/${route.id}`,{
    method: 'PUT',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(route)
  });

  const data = await response.json();

  if( response.ok ){
    await dispatch(postRouteAction(data));
    return data;
  } else {
    console.log(data.errors);
  }
}

export const deleteRoute = route => async dispatch => {
  const response = await fetch(`/api/routes/${route.id}`,{
    method: 'DELETE'
  });

  const data = await response.json();

  if( response.ok ){
    await dispatch(deleteRouteAction(data));
    return data;
  } else {
    console.log(data.errors);
  }

}

// USER STORY
const POST_USER_STORY = 'userStories/PUT'
const DELETE_USER_STORY = 'userStories/DELETE'

const postUserStoryAction = userStory => ({
  type: POST_USER_STORY,
  userStory
})

const deleteUserStoryAction = userStory => ({
  type: DELETE_USER_STORY,
  userStory
})

export const postUserStory = userStory => async dispatch => {
  const response = await fetch(`/api/features/${userStory.feature_id}/user-stories`,{
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(userStory)
  });
  
  const data = await response.json();

  if( response.ok ){
    await dispatch(postUserStoryAction(data));
    return data;
  } else {
    console.log(data.errors);
  }
}

export const putUserStory = userStory => async dispatch => {
  const response = await fetch(`/api/user-stories/${userStory.id}`,{
    method: 'PUT',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(userStory)
  });
  
  const data = await response.json();

  if( response.ok ){
    await dispatch(postUserStoryAction(data));
    return data;
  } else {
    console.log(data.errors);
  }
}

export const deleteUserStory = userStory => async dispatch => {
  const response = await fetch(`/api/user-stories/${userStory.id}`,{
    method: 'DELETE'
  })

  const data = await response.json();

  if( response.ok ){
    await dispatch(deleteUserStoryAction(data));
    return data;
  } else {
    console.log(data.errors);
  }
}

//        
// REDUCER
//        
export default function projects(state = [], action) {
  let newState = {...state};
  switch( action.type ){
    case GET_PROJECTS:
      action.projects.forEach( project => {
        newState[project.id] = project;
      });
      return newState;
    case POST_PROJECT:
      newState[action.project.id] = action.project;
      return newState;
    case DELETE_PROJECT:{
      delete newState[action.project.id];
      return newState;
    }
    case EDIT_PROJECT:{
      newState[action.project.id] = action.project;
      return newState;
    }
    case CLEAR_PROJECTS:{
      return {};
    }
    case POST_FEATURE:{
      const project = newState[action.feature.project_id];
      project.features = {...project.features, [action.feature.id]: action.feature};
      newState[action.feature.project_id] = {...project}
      return newState;
    }
    case DELETE_FEATURE:{
      const project = newState[action.feature.project_id];
      const features = project.features;
      delete features[action.feature.id];
      project.features = {...features};
      newState[action.feature.project_id] = {...project};
      return newState;
    }
    case EDIT_FEATURE:{
      const project = newState[action.feature.project_id];
      const features = project.features;
      features[action.feature.id] = action.feature;
      project.features = {...features};
      newState[action.feature.project_id] = {...project};
      return newState;
    }
    case POST_ROUTE:{
      const project = newState[action.route.project_id];
      const features = project.features;
      const feature = features[action.route.feature_id];
      const routes = feature.routes;
      routes[action.route.id] = action.route;
      feature.routes = {...feature.routes};
      project.features = {...features};
      newState[action.route.project_id] = {...project};
      return newState;
    }
    case DELETE_ROUTE:{
      const project = newState[action.route.project_id];
      const features = project.features;
      const feature = features[action.route.feature_id];
      const routes = feature.routes;
      delete routes[action.route.id];
      feature.routes = {...feature.routes};
      project.features = {...features};
      newState[action.route.project_id] = {...project};
      return newState;
    }
    case POST_USER_STORY:{
      const project = newState[action.userStory.project_id];
      const features = project.features;
      const feature = features[action.userStory.feature_id];
      const user_stories = feature.user_stories;
      user_stories[action.userStory.id] = action.userStory;
      feature.user_stories = {...feature.user_stories};
      project.features = {...features};
      newState[action.userStory.project_id] = {...project};
      return newState;
    }
    case DELETE_USER_STORY:{
      const project = newState[action.userStory.project_id];
      const features = project.features;
      const feature = features[action.userStory.feature_id];
      const user_stories = feature.user_stories;
      delete user_stories[action.userStory.id];
      feature.user_stories = {...feature.user_stories};
      project.features = {...features};
      newState[action.userStory.project_id] = {...project};
      return newState;
    }
    default:
      return newState;
  }
}
