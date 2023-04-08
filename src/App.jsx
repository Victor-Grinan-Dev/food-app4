import './App.css';
import { Routes, Route, HashRouter } from 'react-router-dom';
import Layout from './pages/Layout';

import Home from './views/home/Home';
import About from './views/about/About';
import NotFound from './views/NotFound/NotFound';
import Browse from './views/browse/Browse';
import AddFood from './views/addFood/AddFood';
import FoodSingle from './views/foodSingle/FoodSingle';

console.log('admin@foodapp.dev Abcd1234');

function App() {
  return (
    <HashRouter className="App"> 
        <Routes>
              <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>}></Route>
                <Route path="about" element={<About/>}></Route> 
                <Route path="browse" element={<Browse />} />
                <Route path="add" element={<AddFood />} />
                <Route path="browse/:single" element={<FoodSingle />} />
                <Route path="*" element={<NotFound/>}></Route> 
              </Route>       
          </Routes>   
    </HashRouter>
  );
}

export default App;
