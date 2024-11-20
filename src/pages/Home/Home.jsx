// Styles
import './Home.css';

import { useAuthValue } from "../../Context/AuthContext";

// Components
import Loading from '../../components/Loading/Loading';

// Pages
import Dashboard from '../Dashboard/Dashboard.jsx';
import { Footer } from '../../components/Footer.jsx';


const Home = () => {

const {loading} = useAuthValue();

if (loading) return <Loading />

  return (
    <div className="container">
       <Dashboard />    
       <Footer /> 
    </div>
  );
};

export default Home;