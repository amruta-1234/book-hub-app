import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-card">
    <div className="footer-icon-card">
      <FaGoogle className="media-icon" />
      <FaTwitter className="media-icon" />
      <FaInstagram className="media-icon" />
      <FaYoutube className="media-icon" />
    </div>
    <p className="contact-us">Contact us</p>
  </div>
)

export default Footer
