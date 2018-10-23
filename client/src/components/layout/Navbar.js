import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import { withRouter } from 'react-router-dom'

class Navbar extends Component {
  static propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  }

  onLogoutClick = () => {
    const { history, logoutUser } = this.props
    logoutUser()
    history.push('/login')
  }

  render() {
    const { isAuth, user } = this.props.auth
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <span onClick={this.onLogoutClick} className="nav-link" style={{ cursor: 'pointer' }}>
            <img
              src={user.avatar}
              alt={user.name}
              style={{ width: '25px', marginRight: '5px' }}
              title="You must have a Gravatar connected to your mail to display an image"
              className="rounded-circle"
            />{' '}
            Logout
          </span>
        </li>
      </ul>
    )

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    )

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DevConnector
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="profiles.html">
                  {' '}
                  Developers
                </a>
              </li>
            </ul>
            {isAuth ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

export default connect(
  mapStateToProps,
  { logoutUser },
)(withRouter(Navbar))
