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

  useEffect(()=>{
    if( !aFormActive ){
      setFormActive(false);
      setError(null);
      setPath('');
      setLabel('');
    }
  },[aFormActive]);

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
    if( e.key === 'Enter' ){
      e.target.click();
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
              onClick={stopTheProp}>
          <div  className={`facet-name route-type route-input route-input-type route-${type}`}  
                onClick={handleTypeClick}
                onKeyDown={handleTypeKeyDown}
                tabIndex="0">
            {type}
          </div>
          {type === "API" && 
          <select value={method} onChange={updateMethod}>
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>PATCH</option>
              <option>DELETE</option>
            </select>
          }
          <div className="facet-resizeable-input-container">
            <div className="form-resizer">{path}</div>
          <input  type="text"
                  value={path}
                  onChange={updatePath}
                  placeholder="/path"
                  className="facet-input"
          />
          </div>
        </form>
      }
    </div>
  )
}
