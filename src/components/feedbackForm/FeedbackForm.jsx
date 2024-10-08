import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './feedbackForm.scss'
import ButtonAccent from '../buttonAccent/ButtonAccent';
import XIcon from '../../assets/icons/XIcon';
import supabase from '../../config/supabaseClient';
import { surface } from '../../sass/_variables';

export default function FeedbackForm({setFeedbackFormVisible}) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [loading, setLoading] = useState(false);

    // TODO
    const form = useRef();

    const sendEmail = async (e) => {
        e.preventDefault();
        setLoading(true)
    
        try {
            await emailjs.sendForm('service_779mpxy', 'template_sqb0rsw', form.current, {
                publicKey: '6z87-lgq74fmuK5OF',
            });
    
            console.log('SUCCESS!');
    
            // TODO
            await registerFeedback();
    
            if (isChecked) {
                localStorage.setItem("feedbackSubmittedAndBlocked", true);
            }
    
            setUsername("");
            setEmail("");
            setMessage("");
            setIsChecked(false);
            setFeedbackFormVisible(false);
            setLoading(false);
    
        } catch (error) {
            console.log('FAILED...', error);
            setLoading(false);
        }
    };

    const handleClose = () => {
        setFeedbackFormVisible(false)
    }

    // TODO
    const registerFeedback = async () => {
        const {data, error} = await supabase
            .from('feedbacks')
            .insert([{username, email, message}])
            .select()

            if (error) {
                console.log(error)
            }
            if (data) {
                console.log(data)
            }
    }

    return (
        <div className="feedbackFormWrap">
            
            <div className="feedbackFormContainer">
                <button onClick={handleClose} className="closeButton">
                    <XIcon />
                </button>
                <div className="info">
                    <h2>Leave your Feedback</h2>
                    <p>Whether it's about certain features, how easy the editor is to use, or ways to make it better, I'd love to hear what you think. Your feedback is important for making this tool better for everyone in the GTA World community. Let me know your thoughts, any ideas, or if you ran into any problems!</p>
                    <p>Thank you!</p>
                </div>
                <form ref={form} onSubmit={sendEmail}>
                    <div className="inputWrap">
                        <label htmlFor="user_name">Username:</label>
                        <input type="text" name="user_name" id='user_name' placeholder='Your username' required value={username} onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div className="inputWrap">
                        <label htmlFor="user_email">Email:</label>
                        <input type="email" name="user_email" id='user_email' placeholder='Your email' required value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="inputWrap">
                        <label htmlFor="message">Message</label>
                        <textarea name="message" id='message' placeholder='Your message' required value={message} onChange={e => setMessage(e.target.value)}/>
                    </div>
                    <div className="formControl">
                        <ButtonAccent type="submit"
                            title="Send"
                        >
                            {loading && <img  style={{backgroundColor: surface, borderRadius: "100%", padding: "5px"}} src="/loading.gif" alt="loading" />}
                        </ButtonAccent>
                        <div className="dontShowAgain">
                            <input type="checkbox" name="dontShowAgain" id="dontShowAgain" checked={isChecked} onChange={() => setIsChecked(!isChecked)}/>
                            <label htmlFor="dontShowAgain">Don't show again(after submitting)</label>
                        </div>
                    </div>
                </form>
                <div className="info">
                    <p>I am not saving your data, except username, email and password which are only sent to my email to have all feedbacks on one place.</p>
                </div>
            </div>
        </div>
    )
}
