import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitError = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'post',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitError(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errorMsg, showSubmitError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <img
          className="login-img-lg"
          src="https://res.cloudinary.com/dpk1vp7a8/image/upload/v1679737361/Rectangle_1467_1x_pk2tu1.png"
          alt="website login"
        />
        <div className="login-sub-container">
          <div className="login-card">
            <img
              className="login-img-sm"
              src="https://res.cloudinary.com/dpk1vp7a8/image/upload/v1679739505/Ellipse_99_1x_gz4fdu.png"
              alt="website login"
            />
            <img
              className="login-logo"
              src="https://res.cloudinary.com/dpk1vp7a8/image/upload/v1679737640/Group_7731_1x_dcrcjk.png"
              alt="login website logo"
            />
            <form className="login-form" onSubmit={this.onSubmitForm}>
              <label className="label-el" htmlFor="username">
                Username*
              </label>
              <input
                className="input-el"
                id="username"
                type="text"
                value={username}
                onChange={this.onChangeUsername}
                placeholder="Username"
              />
              <label className="label-el" htmlFor="password">
                Password*
              </label>
              <input
                className="input-el"
                id="password"
                type="password"
                value={password}
                onChange={this.onChangePassword}
              />
              {showSubmitError && <p className="error-msg">{errorMsg}</p>}
              <button className="login-btn" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
