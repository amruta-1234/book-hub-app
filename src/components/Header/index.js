import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {HiMenu} from 'react-icons/hi'

import './index.css'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <>
      <nav className="nav-card">
        <Link to="/">
          <img
            className="header-logo"
            src="https://res.cloudinary.com/dpk1vp7a8/image/upload/v1679737640/Group_7731_1x_dcrcjk.png"
            alt="website logo"
          />
        </Link>

        <div className="header-card">
          <ul className="link-item-card">
            <Link className="link-item" to="/">
              <li key="HOME">Home</li>
            </Link>
            <Link className="link-item" to="/shelf">
              <li key="BOOKSHELVES">Bookshelves</li>
            </Link>
          </ul>
          <button className="logout-btn" onClick={onClickLogout} type="button">
            Logout
          </button>
        </div>
        <button className="menu-btn" type="button">
          <HiMenu />
        </button>
      </nav>
      <div className="navbar-item-section-sm">
        <Link className="link-item-sm" to="/">
          <p className="home-item-sm">Home</p>
        </Link>
        <hr />
        <Link className="link-item-sm" to="/shelf">
          <p className="home-item-sm">Bookshelves</p>
        </Link>
        <hr />
      </div>
    </>
  )
}

export default withRouter(Header)
