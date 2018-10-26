import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authActions'
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup'

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

  componentDidMount() {
    if (this.props.auth.isAuth) {
      this.props.history.push('/dashboard')
    }
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

  componentWillUnmount() {
    this.setState({
      email: '',
      password: '',
      error: '',
      path: '',
    });
  }

  render() {
    console.log('state in login', this.state)
    console.log('props in login', this.props)
    const { email, password, path, error } = this.state
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your DevConnector account</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="email"
                  placeholder="Email Address"
                  value={email}
                  type="email"
                  error={path}
                  onChange={this.onChange} />
                <TextFieldGroup
                  name="password"
                  placeholder="Password"
                  value={password}
                  type="password"
                  error={path}
                  onChange={this.onChange} />
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
