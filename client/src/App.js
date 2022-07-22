import { useState } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import BreedDetail from './components/BreedDetail';
import CreationForm from './components/CreationForm';
import NavBar from './components/NavBar';
import Home from './components/Home';
//import SearchedBreeds from './components/SearchedBreeds';

const App = () => {

  const [currentPage, setCurrentPage] = useState(0);

  return (
    <Switch>
      <Route exact path='/' component={LandingPage} />
      <>
        <NavBar setCurrentPage={setCurrentPage} />
        <Route exact path='/home'>
        <Home currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </Route>
      {/*   <Route relative path='/search' component={SearchedBreeds} /> */}
        <Route strict path='/detail/:id' component={BreedDetail} />
        <Route path='/createbreed' component={CreationForm} />
      </>
    </Switch>
  );
};

export default App;