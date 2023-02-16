import { useRef } from 'react';
import Button from '../UI/Button';
import classes from './SignUp.module.css';

const ForgotPassword = (props) => {
    const emailRef = useRef('');

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailRef.current.value;
        props.onForgot(enteredEmail);
    ;}

    return (
        <section className={classes.signUp}>
            <h2>Forgot Password ?</h2>
            <form onSubmit={submitHandler}>
                <input
                    type='email'
                    name='email'
                    placeholder='Enter your email'
                    required
                    ref={emailRef}
                />
                <Button>Submit</Button>
            </form>
        </section>
    )
};

export default ForgotPassword;