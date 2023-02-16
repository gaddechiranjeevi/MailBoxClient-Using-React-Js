import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from './Components/Layout/Header';
import AuthPage from './Components/Pages/AuthPage';
import HomePage from './components/Pages/HomePage';
import InboxPage from './Components/Pages/InboxPage';
import ComposeMailPage from "./Components/Pages/ComposeMailPage";
import SentPage from "./Components/Pages/SentPage";

function App() {
  const isLogin = useSelector(state => state.authentication.isLogin);
  
  return (
    <Fragment>
      <Header />
        <main>
          <Switch>
          {! isLogin &&
            <Route path='/' exact>
              <HomePage />
            </Route>}
              <Route path='/' exact >
              {isLogin && <HomePage />}
              {!isLogin && <Redirect to='/auth' />}
              </Route>
            <Route path='/auth'>
              {!isLogin &&<AuthPage />}
            </Route>
            <Route path='/compose'>
              {isLogin && <ComposeMailPage />}
              {!isLogin && <Redirect to='/auth' />}
            </Route>
            <Route path='/inbox'>
              {isLogin && <InboxPage />}
              {!isLogin && <Redirect to='/auth' />}
            </Route>
            <Route path='/sent'>
              {isLogin && <SentPage />}
              {!isLogin && <Redirect to='/auth' />}
            </Route>
          </Switch>
        </main>
    </Fragment>
  );
}

export default App;
