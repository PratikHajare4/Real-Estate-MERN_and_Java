import React from 'react';
import { Link } from 'react-router-dom'


export default function Footer() {
  return (
    <div>
        <footer><div className="table-footer-container">
    <table className="footer-table">
      <tbody>
    
        <tr>
          <td>
            <h4>ABOUT US</h4>
            <img src="logo-path.jpg" alt="HomAssist Logo" />
            <p>FOLLOW US</p>
            <div>
              <span><a href="https://facebook.com"><i className="fa fa-facebook"></i></a></span>
              <span>  <a href="https://t.ly/mrWPp"><i className="fa fa-instagram"></i></a></span>
              <span>  <a href="https://linkedin.com"><i className="fa fa-linkedin"></i></a></span>
              <span>  <a href="https://twitter.com"><i className="fa fa-twitter"></i></a></span>
            </div>
            <p>RERA No: A52100046805</p>
          </td>
          <td>
            <h4>QUICK ACCESS</h4>
            <ul>
            <Link to="/about"><li className='hover:text-Gray'>About Us</li></Link>
            <Link to="/contact">
            <li className='hidden sm:inline  hover:text-gray'>Contact US</li>
            </Link>
              <li>Career</li>
              <li>Achievement</li>
              <li>Our Partner</li>
            </ul>
          </td>
          <td>
            <h4>TERMS</h4>
            <ul>
            <li>Terms of services</li>
              <li>Privacy Policy</li>
              <li>Disclaimer</li>
              <li>FAQ</li>
              <li>Help</li>
            </ul>
          </td>
          <td>
            <h4>CONTACT US</h4>
            <p>B Junction, Survey No. 1/2, 1st Floor,  Next to Kothrud Post office, near Karve Statue, Kothrud, Pune, Maharashtra 411038</p>
            <p>+91-8007744449</p>
            <p>bhutadakamesh@gmail.com</p>
            <p>www.homeassist.com</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div className="footer-credits">
    <table>
      <td>© 2024 HomeAssist.com. All Right Reserved.</td>
      <td>Designed By:Komal Dhawade</td>
    </table>
  </div>
  </footer>
 </div>
  )
}
    