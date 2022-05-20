import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { demoLogin } from '../../store/session';

import './DemoUserPanel.css';

export default function DemoUserPanel({path, text}){
  const dispatch = useDispatch();

  const demoLoginFunc = e => {
    e.preventDefault()
    dispatch(demoLogin());
  }

  return (
    <div className="demo-user-panel">
      <button onClick={demoLoginFunc} className="get-started-button">Demo User</button>
    </div>
  );
}
