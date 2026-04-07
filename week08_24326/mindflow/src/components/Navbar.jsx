import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#f0f0f0', marginBottom: '20px' }}>
      <Link to="/" style={{ margin: '0 10px', textDecoration: 'none' }}>Home</Link>
      <Link to="/focus" style={{ margin: '0 10px', textDecoration: 'none' }}>Focus</Link>
      <Link to="/visualizer" style={{ margin: '0 10px', textDecoration: 'none' }}>Visualizer</Link>
    </nav>
  );
};

export default Navbar;