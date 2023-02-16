import classes from './Authentication.module.css';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import SignUp from './SignUp';
import Login from "./Login";
import { authActions } from '../../store/auth-reducer';

const Authentication = (props) => {

    const [isLogin, setIsLogin] = useState(false);
    const [isForgot, setIsForgot] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const signUpHandler = (email, confirmPassword) => {
        fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB_ysGW83ZQUf_X8CJqwT4LCBEScMULekU',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        email: email,
                        password: confirmPassword,
                        returnSecureToken: true
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            )
            .then((res) => {
                if(res.ok){
                    return res.json();
                } else{
                    return res.json().then((data) => {
                        const errorMsg = data.error.message;
                        throw new Error(errorMsg);
                    })
                }
            })
            .then((data) => {
                console.log('successfully created account');
            })
            .catch((error) => {
                alert(error);
            });
    }

    const loginHandler = (email, password) => {
        fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB_ysGW83ZQUf_X8CJqwT4LCBEScMULekU',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            )
            .then((res) => {
                if(res.ok){
                    return res.json();
                } else{
                    return res.json().then((data) => {
                        const errorMsg = data.error.message;
                        throw new Error(errorMsg);
                    })
                }
            })
            .then((data) => {
                const loginObj = {
                    idToken: data.idToken,
                    email: data.email,
                }
                dispatch(authActions.login(loginObj))
                console.log('successfully logged into the account');
                history.replace('/home');
            })
            .catch((error) => {
                alert(error.message);
            });

    }

    const forgotPasswordHandler = (email) => {
        fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB_ysGW83ZQUf_X8CJqwT4LCBEScMULekU',
            {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    requestType: 'PASSWORD_RESET'
                }),
                headers:{
                    "Content-Type": "application/json",
                }
            }
        )
        .then((res) => {
            if(res.ok){
              return res.json()
            }else{
              return res.json().then((data) => {
                const errormsg = data.error.message;
                throw new Error(errormsg)
              })
            }
          })
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            alert(error.message);
          })     
    }

    const onClickSignUpHandler = () => {
        setIsLogin(true);
    }
    
    const onClickLoginHandler = () => {
        setIsLogin(false);
    }

    const onClickPasswordHandler = () => {
        setIsForgot(true);
    }

    return (
        <section className={classes.auth}>
        {!isLogin && <SignUp onSignUp={signUpHandler}/>}
        {isLogin && <Login onLogin={loginHandler}/>}
        {!isLogin && (
            <button className={classes.change} onClick={onClickSignUpHandler}>
                Have an account? Login
            </button>
        )}
         {isForgot && <ForgotPassword  onForgot={forgotPasswordHandler}/> }
            {isLogin && (
              <button style={{
                cursor:'pointer',
                color: 'red', 
                backgroundColor:"white",
                border: 'none',
                fontWeight: 'bold',
                fontSize: '18px',
                }}
                className={classes.button}
                onClick={onClickPasswordHandler}>
                Forgot password ?  
              </button>
            )}
        <br />
        <br />
        {isLogin && (
            <button 
                className={classes.change}
                onClick={onClickLoginHandler}>
                Don't have an account? Sign up
            </button>
        )}
    </section>
    );
};

export default Authentication;