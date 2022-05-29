import { useParams } from 'react-router-dom';
import { useState } from 'react';

export default function Conversions() {
  const project_id = +useParams().project_id;
  const [ loaded, setLoaded ] = useState(false);
  const [ conversions, setConversions ] = useState([]);

  const getConversions = async e => {
    const response = await fetch(`/api/projects/${project_id}/conversions`);
    const data = await response.json();

    setConversions(data.conversions);
  }

  const copyToClipboard = e => {
    navigator.clipboard.writeText(conversions[0])
  }

  return (
    <>
    <h1>Conversions</h1>
      <button onClick={getConversions}>Convert to GFM</button>
      { conversions.length > 0 && (
        <button onClick={copyToClipboard}>Copy to Clipboard</button>
      )}
    </>
  );
}
