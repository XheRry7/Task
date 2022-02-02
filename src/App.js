import logo from './logo.svg';
import './App.css';
import Navbar from './dashboard/navbar';
import Login from './components/pages/login/login';
import SignUp from './components/pages/signup/signup';
import Profile from './components/pages/profilepage/profile';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Feed from './components/pages/feed/feed';
import Settings from './components/pages/settings/settings';
function App() {
  return (
    <div className='main' >

      <div className='lower-div'>
        <main>
          <Switch className='body'>
            <Route path="/" component={Login} exact />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path='/feed' component={Feed} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/Settings' component={Settings} />
          </Switch>
        </main>
      </div>
    </div>
  );
}

export default App;
