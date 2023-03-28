import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      className="not-found-img"
      src="https://res.cloudinary.com/dpk1vp7a8/image/upload/v1679739223/Group_7484_k1vg56.png"
      alt="not found"
    />
    <h1 className="not-found-title">Page Not Found</h1>
    <p className="not-found-text">
      we are sorry, the page you requested could not be found, Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button className="go-back-btn" type="button">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
