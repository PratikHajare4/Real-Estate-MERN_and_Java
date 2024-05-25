import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { FaCheck, FaTimes } from 'react-icons/fa'
import './Referral.css'; // Importing CSS for styles
import Footer from '../components/Footer';


function Referral() {
    const [formData, setFormData] = useState({});
    const [notification, setNotification] = useState({ message: '', type: '' });
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_bjnapyo', 'template_c6hl6lj', form.current, '7TtamuXqre-xpHhlA')
            .then((result) => {
                console.log('Email successfully sent!', result.text);
                setFormData({
                    name: '',
                    mobile: '',
                    email: '',
                    city: '',
                    requirement: '',
                    budget: '',
                    location: '',
                    possession: ''
                });
                setNotification({ message: 'Submitted Successfully!', type: 'success' });
                setTimeout(() => setNotification({ message: '', type: '' }), 5000);  // Clear notification after 5 seconds
            }, (error) => {
                console.log('Failed to send email.', error.text);
                setNotification({ message:` Not submitted: ${error.text}`, type: 'error' });
                setTimeout(() => setNotification({ message: '', type: '' }), 5000);  // Clear notification after 5 seconds
            });

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        
        <div>
      <div class="contact-banner">
        <h1 class="banner">REFFERAL</h1>
      </div>
      <div className='py-20 px-4 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4 text-slate-800'>HomAssist CONNECTOR PROGRAMME</h1>
      <p className='mb-4 text-slate-700'> 
      <p>What is HomAssist Connector?</p>
    <p>It's an association Platform where you can share / register your referral leads and earn Pay-outs.</p>
    <p>How To Become HomAssist Connector?</p>
    <p>You need to fill the connector application form and submit the same via Post / Email the scan copy.</p>
    <p>What Documents does it require?</p>
    <p>It requires your Photo ID (PAN Card/ Adharcard Photo Copy) Your Banking details to release the pay-out.</p>
    <p>Is there any Fees / Charges to become Connector with HomAssist?</p>
    <p>No. We do not charge any fees to become connector.</p>
    <p>What is the benefit / Pay-outs?</p>
    <p>You can get up to 25000 per booking.</p>
    <p>How it works?</p>
    <p>If you have any reference who is looking for a property then you can forward the lead to us via Connector App / Google Form and we will take care everything.</p>
    <p>How should I know the status of the lead?</p>
    <p>You will receive the report every week Month. You may also check with your referral.</p>
    <p>When do you expect the Pay-Out?</p>
    <p>Once the agreement done Builder normally release the Pay-out withing 45 Days. Once we get the Payment from Builder we release your Pay-out. (Within 60 Days from Agreement).</p>

      </p>

        <div className="form-container">
             {notification.message && (
                <div className= {`notification ${notification.type}`} style={notificationStyles[notification.type]}>
                    {notification.type === 'success' ? <FaCheck /> : <FaTimes />}
                    {notification.message}
                </div>
           )}
            <form ref={form} onSubmit={sendEmail} className="enquiry-form">
                <div className="input-row">
                    <input type="text" name="from_name" placeholder="Enter Name" onChange={handleChange} value={formData.name} />
                    <input type="text" name="from_mobile" placeholder="Enter Mobile No." onChange={handleChange} value={formData.mobile} />
                </div>
                <div className="input-row">
                    <input type="email" name="email" placeholder="Enter Email Id" onChange={handleChange} value={formData.email} />
                    <input type="text" name="city" placeholder="Enter City Name" onChange={handleChange} value={formData.city} />
                </div>
                <div className="input-row">
                    <select name="requirement" onChange={handleChange} value={formData.requirement}>
                        <option value="">Your Requirement</option>
                        <option value="option1">1BHK</option>
                        <option value="option2">2BHK</option>
                    </select>
                    <input type="text" name="budget" placeholder="Your Budget" onChange={handleChange} value={formData.budget} />
                </div>
                <div className="input-row">
                    <input type="text" name="location" placeholder="Preferred Location" onChange={handleChange} value={formData.location} />
                    <input type="text" name="possession" placeholder="Possession" onChange={handleChange} value={formData.possession} />
                </div>
                <center>
                    <button type="submit" className="submit-btn">SUBMIT</button></center>
            </form>
        </div>
        </div>
        <Footer></Footer>
        </div>
        
    );
}
const notificationStyles = {
    success: {
        position: 'fixed',
        top: '500px',
        right: '20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    error: {
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: '#f44336',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    }
};
export default Referral;