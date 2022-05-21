
// PROJECTS

const GET_PROJECTS    = 'projects/GET_PROJECTS'
const POST_PROJECT    = 'projects/POST_PROJECT'
const DELETE_PROJECT  = 'projects/DELETE_PROJECT'
const EDIT_PROJECT    = 'projects/EDIT_PROOJECT'

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
    case POST_FEATURE:{
      const project = newState[action.feature.project_id];
      project.features = [...project.features, action.feature];
      newState[action.feature.project_id] = {...project}
      return newState;
    }
    case DELETE_FEATURE:{
      const project = newState[action.feature.project_id];
      const features = project.features;
      const index = features.findIndex(f => f.id === +action.feature.id);
      features.splice(index, 1);
      project.features = [...features];
      newState[action.feature.project_id] = {...project};
      return newState;
    }
    case EDIT_FEATURE:{
      const project = newState[action.feature.project_id];
      const features = project.features;
      const index = features.findIndex(f => f.id === +action.feature.id);
      features[index] = action.feature
      project.features = [...features];
      newState[action.feature.project_id] = {...project};
      return newState;
    }
    default:
      return newState;
  }
}
