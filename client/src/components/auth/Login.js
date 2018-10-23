import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authActions'
import PropTypes from 'prop-types'
import className from 'classnames'

class Login extends PureComponent {
  static propTypes = {
    error: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
  }

  state = {
    email: '',
    password: '',
    error: '',
    path: '',
  }

  onChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value,
    })
  }

  onSubmit = e => {
    e.preventDefault()
    const { loginUser } = this.props
    const { email, password } = this.state
    const user = { email, password }
    loginUser(user)
  }

  componentDidUpdate() {
    if (this.props.auth.isAuth) {
      this.props.history.push('/dashboard')
    }
    this.setState({
      error: this.props.error.message,
      path: this.props.error.path,
    })
  }

  render() {
    const { email, password, path, error } = this.state
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your DevConnector account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className={className('form-control form-control-lg', {
                      'is-invalid': path === 'email',
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={className('form-control form-control-lg', {
                      'is-invalid': path === 'password',
                    })}
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={this.onChange}
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
              <p className="text-danger text-center mt-2">{error}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    error: state.error,
  }
}

export default connect(
  mapStateToProps,
  { loginUser },
)(Login)
