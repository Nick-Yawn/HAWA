import { Link } from 'react-router-dom';

import './DemoUserPanel.css';

export default function DemoUserPanel({path, text}){
  return (
    <div className="demo-user-panel">
      <button className="get-started-button">Demo User</button>
    </div>
  );
}
