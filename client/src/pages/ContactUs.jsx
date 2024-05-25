import React, { useState, useRef } from 'react';
import './styles.css';
import emailjs from '@emailjs/browser';
import { FaCheck, FaTimes } from 'react-icons/fa'
import Footer from '../components/Footer';

function ContactPage() {
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [formData, setFormData] = useState({
  });
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_bjnapyo', 'template_c6hl6lj', form.current, {
        publicKey: '7TtamuXqre-xpHhlA',
      })
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert('Form submitted. Check the console for data.');
  };

  return (
    <div>
      <div class="contact-banner">
        <h1 class="ram">Contact us</h1>
      </div>
      <div className="container">
        <div className="contact-info">
          <h2>GET IN TOUCH WITH US</h2>
          <div className="office">
            <p><strong>Head Office</strong></p>
            <b>Address:</b> B Junction, Survey No. 1/2, 1st Floor,  Next to Kothrud Post office, near Karve Statue, Kothrud, Pune, Maharashtra 411038
            <br />
            <b> Email:</b> bhutadakamesh@gmail.com
            <br />
            <b> Phone:</b> +918007744449
          </div>
          {/* Add other offices similarly */}
        </div>
        <div className="form-container">
          <h1>Send Your Message</h1>

          <form ref={form} onSubmit={sendEmail}>
            <input className="input-field" type="text" name="from_name" placeholder="Enter Name" onChange={handleChange} value={formData.name} />
            <input className="input-field" type="text" name="from_mobile" placeholder="Enter Mobile No." onChange={handleChange} value={formData.mobile} />
            <input className="input-field" type="email" name="from_email" placeholder="Enter Email Id" onChange={handleChange} value={formData.email} />
            <input className="input-field" type="text" name="from_city" placeholder="Enter City Name" onChange={handleChange} value={formData.city} />
            <input className="input-field" name="from_enquiry" placeholder="Enquiry For" onChange={handleChange} value={formData.enquiry} />
            <textarea className="input-field" name="from_message" placeholder="Enter Message" onChange={handleChange} value={formData.message} />
            <button className="submit-btn" type="submit">SUBMIT</button>
          </form>

        </div>
      </div>
      <div class="map-container">
        <iframe class="maps" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.597370749558!2d73.81191887441459!3d18.501888169746184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bfc0932165e3%3A0x7ced19ddb6d2ee88!2sB%20junction%20By%20Surana%20Bothara%20Associates!5e0!3m2!1sen!2sin!4v1714885087568!5m2!1sen!2sin" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>

      {notification.message && (
                <div className={`notification ${notification.type}`} style={notificationStyles[notification.type]}>
                    {notification.type === 'success' ? <FaCheck /> : <FaTimes />}
                    {notification.message}
                </div>
            )}
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
export default ContactPage;