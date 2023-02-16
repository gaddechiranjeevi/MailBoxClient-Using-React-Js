import { useSelector } from "react-redux";
import classes from "./Home.module.css";

const Home = () => {

    const isLogin = useSelector(state => state.authentication.isLogin);

    return (
        <div>
        { isLogin ? (
        <div className={classes.home}>
        <h>Hello..!</h>
        <h1>Welcome to Mail Box</h1>
        <p>Mail Box can send and receive mails</p>
        </div>):(
            <div className={classes.details}>
                <p>Welcome to Mail Box</p>
                <p1>
                    "Mail Box which can receive and transfer mails"<br/>
                    <p2>Click on Login to</p2><br/>
                    start managing your daily mail's
                </p1>
            </div>
        )}
        </div>
    )
};

export default Home;