import './App.css';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import BreedDetail from './components/BreedDetail';
import CreationForm from './components/CreationForm';
import NavBar from './components/NavBar';
import Home from './components/Home';
import SearchedBreeds from './components/SearchedBreeds';

const App = () => 
    <Switch>
      <Route exact path='/' component={LandingPage} />
      <>
        <NavBar />
        <Route exact path='/home' component={Home} />
        <Route relative path='/search' component={SearchedBreeds} /> 
        <Route strict path='/detail/:id' component={BreedDetail} />
        <Route path='/createbreed' component={CreationForm} />
      </>
    </Switch>

export default App;