
const GET_PROJECTS    = 'projects/GET_PROJECTS'
const POST_PROJECT    = 'projects/POST_PROJECT'
const DELETE_PROJECT  = 'projects/DELETE_PROJECT'

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

export default function projects(state = [], action) {
  let newState = [...state];
  switch( action.type ){
    case GET_PROJECTS:
      return [ ...action.projects ]
    case POST_PROJECT:
      newState = [...newState, action.project]
      return newState;
    case DELETE_PROJECT:
      const projectIndex = newState.findIndex(project => project.id === +action.project.id);
      newState.splice(projectIndex, 1);
      return newState;
    default:
      return newState;
  }
}
