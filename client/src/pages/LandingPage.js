import './LandingPage.css';
import {Link} from 'react-router-dom';

function LandingPage() {

  return (
    <div>
      <div className="ttContainer">
        <span className="titleText">Fifteen Recipes</span>
      </div>
        <div className='lrContainer'>
          <Link to="/login" className='lrButton'>Login/Register</Link>
          </div>
    </div>
  );
}

export default LandingPage;