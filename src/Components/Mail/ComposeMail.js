import axios from 'axios';
import { Editor } from "react-draft-wysiwyg";
import { useRef } from 'react';
import Button from '../UI/Button';
import classes from './ComposeMail.module.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const ComposeMail = () => {
    const emailRef = useRef('');
    const subjectRef = useRef('');
    let content;

    const onEditorStateChange = (event) => {
        content = event.getCurrentContent().getPlainText();
    }

    const composeHandler = async(event) => {
        event.preventDefault();

        const enteredEmail = emailRef.current.value;
        const enteredSubject = subjectRef.current.value;
        const userMailId = localStorage.getItem('email');
        const userMail = userMailId.split('.').join('');
        const toEmailId = enteredEmail.split('.').join('');

        const mailDataObj = {
            from: userMail,
            to: enteredEmail,
            subject: enteredSubject,
            body: content,
            read: false
        }

        try {
            const res = await axios.post(
                `https://mail-box-8d69e-default-rtdb.firebaseio.com/${toEmailId}Inbox.json`,
                mailDataObj
            );
            alert('Sent successfully');
            console.log(res);
            
            const sentRes = await axios.post(
                `https://mail-box-8d69e-default-rtdb.firebaseio.com/${userMail}SentMail.json`,
                mailDataObj
            );
            console.log(sentRes);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className={classes.compose}>
            <h1>Compose Mail</h1>
            <form onSubmit={composeHandler}>
                <input 
                    name='email'
                    type='email'
                    placeholder='To'
                    required
                    ref={emailRef}
                />
                <input 
                    name='subject'
                    type='subject'
                    placeholder='Subject'
                    ref={subjectRef}
                />
                <Editor
                    // editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={onEditorStateChange}
                />
                <Button>Send</Button>
            </form>
        </section>
    )
};

export default ComposeMail;