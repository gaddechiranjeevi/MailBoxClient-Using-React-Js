import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/layout/Header';
import AuthPage from './components/pages/AuthPage';
import HomePage from './components/pages/HomePage';


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
          </Switch>
        </main>
    </Fragment>
  );
}

export default App;
