import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { authActions } from '../../store/auth-reducer';
import LogOut from './LogOut';
import classes from "./Header.module.css";

const Header = () => {
  const isLogin = useSelector(state => state.authentication.isLogin);
  const inboxMails = useSelector(state => state.compose.fetchMail);
  const dispatch = useDispatch();
  const history = useHistory();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (inboxMails) {
      let count = 0;
      Object.keys(inboxMails).map((mail) => {
            if (inboxMails[mail].read === false) {
              count = count + 1;
              console.log(count);
            setUnreadCount(count);
        }
      });
    }
  }, [inboxMails]);



    const logOutHandler = () => {
      dispatch(authActions.logout());
      history.replace('/auth');
    };


  return (
    <header className={classes.header}>
      <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Circle-icons-mail.svg/2048px-Circle-icons-mail.svg.png' alt='mail'/>
      <h1>Mail Box!!!</h1>
      <nav>
        <ul>
          <li>
              <NavLink 
                to="/"  
                activeClassName={classes.active} exact >
                Home
              </NavLink>
          </li>
          {!isLogin && (
            <li>
                <NavLink to="/auth"  
                activeClassName={classes.active} >
                Login
                </NavLink>
            </li>
          )}
          {isLogin && (
            <li>
                <NavLink to='/compose'
                    activeClassName={classes.active}>
                    Compose
                </NavLink>
            </li>
            )}
            {isLogin && (
              <li>
                  <NavLink to="/inbox"  
                  activeClassName={classes.active} >
                  Inbox
                  {unreadCount === 0 ? (
                    <></>
                  ) : (
                    <span>{unreadCount} Unread</span>
                  )}
                  </NavLink>
              </li>
            )}   
            {isLogin && (
              <li>
                  <NavLink to="/sent"  
                    activeClassName={classes.active} >
                    Sent Mails
                  </NavLink>
              </li>)}
            {isLogin && (
              <LogOut 
                  onClick={logOutHandler}>
                  LogOut
              </LogOut>
            )}      
        </ul>
      </nav>
    </header>
  )
};

export default Header