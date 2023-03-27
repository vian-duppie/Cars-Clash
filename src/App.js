import {Route, Routes} from 'react-router-dom';
import Nav from './components/Navbar/Nav';
import Dashboard from './pages/Dashboard';
import Compare from './pages/Compare';
import Timeline from './pages/Timeline';
import Icon from './components/Icon/Icon';


function App() {
  return (
    <div className="App">
        <Nav/>

        <Routes>
            <Route path='/' element = {<Dashboard />} />
            <Route path='/Compare' element = {<Compare />} />
            <Route path='/Timeline' element = {<Timeline />} />
        </Routes>
    </div>
  );
}

export default App;
