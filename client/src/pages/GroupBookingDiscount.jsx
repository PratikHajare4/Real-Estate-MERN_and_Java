import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { FaCheck, FaTimes } from 'react-icons/fa'
import './GroupBookingDiscount.css'; // Importing CSS for styles
import Footer from '../components/Footer';


function GroupBookingDiscount() {
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
        <h1 class="banner">GROUP BOOKING</h1>
      </div>
      <div className='py-20 px-4 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4 text-slate-800'>GROUP BOOKING</h1>
      <p className='mb-4 text-slate-700'> 
      
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
            {/* <Footer></Footer> */}
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
export default GroupBookingDiscount;