
const READ_PROJECTS = 'projects/GET_PROJECTS'

const readProjectsAction = projects => ({
  type: READ_PROJECTS,
  projects
})

export const readProjects = () => async dispatch => {
  const response = await fetch('/api/projects/');

  const data = await response.json();

  if( response.ok ){
    await dispatch(readProjectsAction(data.projects));
    return data.projects;
  } else {
    console.log(data.errors);
  }
} 

export default function projects(state = [], action) {
  const newState = [...state];
  switch( action.type ){
    case READ_PROJECTS:
      return [ ...action.projects ]
    default:
      return newState;
  }
}
