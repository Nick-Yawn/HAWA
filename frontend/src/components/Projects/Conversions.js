import { useParams, useHistory } from 'react-router-dom';
import { useState } from 'react';

import './Project.css';
import './Conversions.css';

export default function ConversionsModal(props) {
  const { 
          project_id,
          showConversions,
          setShowConversions
        } = props;
  const history = useHistory();
  const [ loaded, setLoaded ] = useState(false);
  const [ conversions, setConversions ] = useState([]);

  const getConversions = async e => {
    const response = await fetch(`/api/projects/${project_id}/conversions`);
    const data = await response.json();

    setConversions(data.conversions);
    setLoaded(true);
  }

  const copyToClipboard = e => {
    navigator.clipboard.writeText(conversions[0])
  }

  const hideModal = e => setShowConversions(false);
  const redirectToProject = e => history.push(`/projects/${project_id}`);
  const stopTheProp = e => e.stopPropagation();

  return (
    <div  className="conversions-background" 
          onClick={hideModal}>
      <div className="conversions-modal" onClick={stopTheProp}>
        <span className="conversion-text">Convert to GitHub Flavored Markdown</span>
          <button id="convert-button" onClick={getConversions} disabled={loaded}>Generate Conversions</button>
          <div className="conversions-container">
          { conversions.map( (c, i) => (
              <Conversion conversion={c} key={i} />
            ))}
          </div>
      </div>
    </div>
  );
}

function Conversion({ conversion }){
  const [ copied, setCopied ] = useState(false);
     
  const copyToClipboard = e => {
    navigator.clipboard.writeText(conversion.output);
    setCopied(true);
    setTimeout(()=>setCopied(false), 1500)
  }

  return (
    <div className="conversion">
      <span className="conversion-text">{conversion.name}</span>  
      <button className="copy-button" onClick={copyToClipboard}>{ copied ? 'Copied!' : 'Copy to Clipboard' }</button>
    </div>
  );
}
