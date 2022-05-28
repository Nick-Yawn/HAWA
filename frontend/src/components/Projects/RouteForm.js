import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

export default function RouteForm(props) {
  const { setAFormActive, aFormActive } = props;
  const dispatch = useDispatch();
  const project_id = +useParams().project_id;
  const [ formActive, setFormActive] = useState(false);
  const [ type, setType ]     = useState('Front-End');
  const [ method, setMethod ] = useState('GET');
  const [ path, setPath ]     = useState('');
  const [ label, setLabel ]   = useState('');
  const [ error, setError ]   = useState(false);
  const typeRef = useRef(null);

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
    /*
    const newRoute = await dispatch(postRoute({
      type,
      method: (type === "API" ? method : null),
      path,
      label
    }))*/
  }

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

  const handleTypeKeyDown = e => {
    e.stopPropagation();
    if( e.key === 'Enter' ){
      e.target.click();
    } else if ( e.key === 'Escape') {
      setFormActive(false);
    }
  }

  const handleEscapeKeyDown = e => {
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
          <select value={method} onChange={updateMethod} onKeyDown={handleEscapeKeyDown}>
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
                    onKeyDown={handleEscapeKeyDown}
                    onChange={updatePath}
                    placeholder={ type === "API" ? "/api/resource" : "/path"  }
                    className="facet-input route-path-input"
            />
          </div>

          {/* label */}
          <div className="facet-resizeable-input-container route-input-container">
            <div className="form-resizer">{path}</div>
            <input  type="text"
                    value={label}
                    onKeyDown={handleEscapeKeyDown}
                    onChange={updateLabel}
                    placeholder="description"
                    className="facet-input"
            />
          </div>
          { error && (
            <div className="facet-name facet-error">
              {error}
            </div>
          )} 
        </form>
      }
    </div>
  )
}
