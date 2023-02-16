import axios from "axios";
import { useEffect, useState } from "react";
import SingleMail from './SingleMail';
import classes from './Inbox.module.css';

const Sent = () => {
    const userMailId = localStorage.getItem('email');
    const [singleMail, setSingleMail] = useState(false);
    const [mails, setSentMails] = useState([]);

    const fetchSentMails = async () => {
        const userMail = userMailId.split('.').join('');
        console.log(userMail);

        try {
            const res = await axios.get(
            `https://mail-box-8d69e-default-rtdb.firebaseio.com/${userMail}SentMail.json`
            );
            console.log(res.data);
            const data = res.data;
            setSentMails(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchSentMails();
        // eslint-disable-next-line
    }, []);

    const singleMailHandler = (mail) => {
        setSingleMail(mail);
    }

    return (
        <section className={classes.inbox}>
            <h1>Sent Mails</h1>
            <div>
                <ul>
                    {!singleMail && mails!== null &&
                        Object.keys(mails).map((mail) => {
                            return (
                                <div key={mail.toString()}>
                                    <div
                                        onClick={() =>singleMailHandler(mail)}>
                                        <li>
                                            <span>To: {mails[mail].to}</span><br />
                                            <span>Subject: {mails[mail].subject}</span>
                                        </li> 
                                    </div>  
                                    <hr />
                                </div>
                            )
                        })
                    }
                    {singleMail && (
                        <SingleMail mailDetails={{singleMail, mails}} />
                        )}
                    {mails === null && <p>No mails found</p>}
                </ul>
            </div>
        </section>
    )
};

export default Sent;