import classes from './LogOut.module.css';

const LogOut = (props) => {
    return (
        <div className={classes['logout-button']}>
            <button 
                onClick={props.onClick}>
                {props.children}
            </button>
        </div>
    );
};

export default LogOut;