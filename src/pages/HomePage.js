import { Link } from 'react-router-dom';
import ActivitySearch from '../components/ActivitySearch'

function HomePage() {
  
  return (
    <div>
      <h1>Home Page</h1>
      <ActivitySearch />
      <Link to="/addActivity"><button>Add new activity</button></Link>
    </div>
  );
}

export default HomePage;