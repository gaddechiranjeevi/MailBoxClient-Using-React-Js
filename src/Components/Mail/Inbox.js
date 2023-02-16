import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { composeActions } from '../../store/compose-reducer';
import classes from './Inbox.module.css';

const Inbox = () => {
    const mails = useSelector(state => state.compose.fetchMail);
    const dispatch = useDispatch();

    const userMailId = localStorage.getItem('email');
    const userMail = userMailId.split('.').join('');

    const fetchMails = async () => {
        try {
            const res = await axios.get(
            `https://mail-box-8d69e-default-rtdb.firebaseio.com/${userMail}Inbox.json`
            );
            console.log(res);
            dispatch(composeActions.fetchMail(res.data))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setInterval(() => {
            fetchMails();
            console.log('called');
        }, 200000)
        // eslint-disable-next-line
    }, []);

    return (
        <section className={classes.inbox}>
            <h1>Received Mails</h1>
            <div>
                <ul>
                            return (
                                <div key={mail.toString()}>
                                    <div
                                        onClick={() =>singleMailHandler(mail)}>
                                        <li
                                            style={{ 
                                                listStyleType: read ? 'none' : 'disc',color: read ? 'black' : 'blue'
                                                }}>
                                            <span>From: {mails[mail].from}</span>
                                        </li> 
                                    </div>
                                    <hr />
                                </div>
                 </ul>
            </div>
        </section>
    )
};

export default Inbox;