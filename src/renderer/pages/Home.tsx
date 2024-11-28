import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/bus-times">
        <button type="button">Go to Bus Times</button>
      </Link>
    </div>
  );
}

export default Home;
