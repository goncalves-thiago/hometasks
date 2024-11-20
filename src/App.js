// Styles
import './App.css';

// Hooks
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

// Context
import { useAuthValue } from './Context/AuthContext';

// Components
import Navbar from './components/Navbar/Navbar';

// Pages
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Loading from './components/Loading/Loading';
import Task from './pages/Task/Task';
import NewTask from './pages/NewTask/NewTask';
import Family from './pages/Family/Family';
import CreateAccount from './pages/CreateAccount/CreateAccount';
import Profile from './pages/Profile/Profile';
import CreateFamily from './pages/CreateFamily/CreateFamily';
import Report from './pages/Report/Report';
import ChangeAvatar from './pages/ChangeAvatar/ChangeAvatar';

function App() {

  const { userData, loading: loadingUser, authenticated }= useAuthValue();

  if(loadingUser) return <Loading size="full"/>

  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
        {authenticated  && <Navbar />}
          <Routes>
            <Route path="/login" element={!authenticated ? <Login /> : <Navigate to="/" />} />
            <Route path="/createAccount" element={!authenticated ? <CreateAccount /> : <Navigate to="/" />} />
            <Route path="/" element={authenticated  ? <Home /> : <Navigate to="/login" />} />
            <Route path="/task/:id" element={authenticated  ? <Task /> : <Navigate to="/login" />} />
            <Route path="/task/new" element={(authenticated && userData.isOwner)  ? <NewTask /> : <Navigate to="/login" />} />
            <Route path="/family" element={(authenticated && userData.isOwner)  ? <Family /> : <Navigate to="/login" />} />
            <Route path="/createFamily" element={(authenticated && !userData.familyId)  ? <CreateFamily /> : <Navigate to="/family" />} />
            <Route path="/profile" element={(authenticated)  ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/report" element={(authenticated && userData.isOwner)  ? <Report /> : <Navigate to="/login" />} />
            <Route path="/changeAvatar" element={authenticated  ? <ChangeAvatar /> : <Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
