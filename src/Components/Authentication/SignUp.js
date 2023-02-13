import { useRef } from 'react';
import classes from './SignUp.module.css';

const SignUp = (props) => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const confirmPasswordRef = useRef('');

    const signUpHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;
        const enteredConfirmPassword = confirmPasswordRef.current.value;

        if(enteredPassword !== enteredConfirmPassword) {
            alert('Incorrect password');
        } else {
            props.onSignUp(enteredEmail, enteredConfirmPassword);
        }
    }

    return (
        <section>
            <div className={classes.signUp}>
                <h1>Sign Up</h1>
                <form onSubmit={signUpHandler}>
                    <input 
                        name='email'
                        type='email'
                        placeholder='Email ID'
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
                    <input 
                        name='confirmPassword'
                        id='confirmPassword'
                        placeholder='Confirm Password'
                        required
                        ref={confirmPasswordRef}
                    />
                    <button>Sign Up</button>
                </form>
            </div>
        </section>
    );
};

export default SignUp;