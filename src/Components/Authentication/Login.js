import { useRef } from 'react';
import classes from './Login.module.css';

const Login = (props) => {
    const emailRef = useRef('');
    const passwordRef = useRef('');

    const loginHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;
        props.onLogin(enteredEmail, enteredPassword);
    }

    return (
        <section>
            <div className={classes.login}>
            <h1>Login</h1>
                <form onSubmit={loginHandler}>
                    <input 
                        name='email'
                        type='email'
                        placeholder='Email'
                        required
                        ref={emailRef}
                    />
                    <input 
                        name='password'
                        type='password'
                        placeholder='Password'
                        required
                        ref={passwordRef}
                    />
                    <button>Login</button>
                </form>
            </div>
        </section>
    )
};

export default Login;