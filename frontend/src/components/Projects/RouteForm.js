import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { postRoute, putRoute } from '../../store/projects';

export default function RouteFormWrapper(props) {
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
          + Add Routes
        </div>
      }
      { formActive && 
        <RouteForm  aFormActive={aFormActive}
                    setFormActive={setFormActive}
                    formActive={formActive}
                    setFormActive={setFormActive}
                    feature_id={feature_id}
        />
      }
    </div>
  )
}

export function RouteForm(props) {
  const {
          formActive,
          aFormActive,
          setFormActive,
          setAFormActive,
          feature_id,
          route
        } = props;
  const dispatch = useDispatch();
  const project_id = +useParams().project_id;
  const [ type, setType ]     = useState('Front-End');
  const [ method, setMethod ] = useState('GET');
  const [ path, setPath ]     = useState('');
  const [ label, setLabel ]   = useState('');
  const [ error, setError ]   = useState(false);
  const typeRef = useRef(null);
  const id = route?.id;


  useEffect(()=>{
    if( !aFormActive ){
      setFormActive(false);
      setError(null);
      setPath('');
      setLabel('');
    }
  },[aFormActive]);

  useEffect(()=>{
    if( formActive )
      typeRef.current.focus();
    if( route ){
      setType(route.type);
      setMethod(route.method || 'GET');
      setPath(route.path || '');
      setLabel(route.label || '');
    }
  },[formActive])

  const handleSubmit = async e => {
    e.preventDefault();
    if( path === '' ){
      setError("Path is required.");
      return;
    } else if( path.length > 80 ){
      setError("Path is limited to 80 characters.");
      return;
    }

    if( route ){
        const editedRoute = await dispatch(putRoute({
          type,
          method: (type === "API" ? method : null),
          path,
          label,
          project_id,
          feature_id,
          id
        }));

        if( editedRoute.id ){
          setAFormActive(false);
        }
    } else {
      const newRoute = await dispatch(postRoute({
        type,
        method: (type === "API" ? method : null),
        path,
        label,
        project_id,
        feature_id
      }));

      if( newRoute.id ){
        setPath('');
        setLabel('');
        typeRef.current.focus();
      }
    }
  }

  const handleTypeKeyDown = e => {
    e.stopPropagation();
    if( e.key === 'Enter' ){
      e.target.click();
    } else if ( e.key === 'Escape') {
      setFormActive(false);
    }
  }

  const handleMethodKeyDown = e => {
    if( e.key === 'Enter' )
      e.stopPropagation();
  }

  const handleTextInputKeyDown = e => {
    if( e.key === 'Escape' ){
      setFormActive(false);
      setError(null);
      setPath('');
      setLabel('');
    } else if( e.key === 'Enter' ){
      handleSubmit(e);
    }
  }

  const handleTypeClick = e => {
    e.stopPropagation();
    setType("Front-EndAPI".replace(type, ""))
  }

  
  const updateType = e => setType(e.target.value);
  const updateMethod = e => setMethod(e.target.value);
  const updatePath = e => {
    if( !e.target.value.includes(" ")){
     setPath(e.target.value)
    }
  };
  const updateLabel = e => setLabel(e.target.value);
  const stopTheProp = e => e.stopPropagation();
 return (
    <form className="facet-form"
          onClick={stopTheProp}
          onSubmit={handleSubmit}>
      
      {/* type: Front-End / API */}
      <div className={`facet-name route-type route-input route-input-type route-${type}`}  
            onClick={handleTypeClick}
            onKeyDown={handleTypeKeyDown}
            tabIndex="0"
            ref={typeRef}>
        {type}
      </div>

      {/* Method, if type is API */}
      {type === "API" && 
      <select value={method} onChange={updateMethod} onKeyDown={handleMethodKeyDown}>
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>PATCH</option>
          <option>DELETE</option>
        </select>
      }

      {/* path */}
      <div className="facet-resizeable-input-container route-input-container">
        <div className="form-resizer route-path-resizer">{path}</div>
        <input  type="text"
                value={path}
                onKeyDown={handleTextInputKeyDown}
                onChange={updatePath}
                placeholder={ type === "API" ? "/api/resource" : "/path"  }
                className={"facet-input route-path-input " + (path.length > 80 ? "bad-input" : "")}
        />
      </div>

      {/* label */}
      <div className="facet-resizeable-input-container route-input-container">
        <div className="form-resizer">{label}</div>
        <input  type="text"
                value={label}
                onKeyDown={handleTextInputKeyDown}
                onChange={updateLabel}
                placeholder="description"
                className={"facet-input " + (label.length > 255 ? "bad-input" : "")}
        />
      </div>
      { error && (
        <div className="facet-name facet-error">
          {error}
        </div>
      )} 
      { route && <button className="facet-button" onClick={handleSubmit}> Submit </button>}
    </form>
 );

}
