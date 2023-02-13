import classes from './Authentication.module.css';
import SignUp from './SignUp';

const Authentication = (props) => {

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


    return (
        <section className={classes.auth}>
            <SignUp onSignUp={signUpHandler}/>
        </section>
    );
};

export default Authentication;