import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import Search from './Search';
import Details from './Details';
import ResetForm from './components/reset-form/reset-form.component';
import ForgotForm from './components/forgot-form/forgot-form.component';
import Chatbox from './components/Chatbox/Chatbox';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Authentification from './components/authentication/authentication.component';
import Upload from './Upload'

function App() {
  return (
    <Router basename="/">
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/upload">
              <Upload />
            </Route>

            <Route exact path="/auth">
              <Authentification />
            </Route>

            <Route exact path="/auth/reset">
              <ResetForm />
            </Route>

            <Route exact path="/auth/forgot">
              <ForgotForm />
            </Route>

            <Route exact path="/details/:id">
              <Details />
            </Route>

            <Route exact path="/search">
              <Search />
            </Route>
          </Switch>
        </div>
        <Chatbox></Chatbox>
      </div>
    </Router>
  );
}

export default App;

