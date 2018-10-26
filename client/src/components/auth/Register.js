import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup'

class Register extends PureComponent {
  static propTypes = {
    error: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    registerUser: PropTypes.func.isRequired,
  }

  state = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    password2: '',
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
    const { name, lastname, email, password, password2 } = this.state
    this.props.registerUser({ name, lastname, email, password, 'Confirm password': password2 }, this.props.history)
  }

  componentDidUpdate() {
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
    const { name, lastname, email, password, password2, error, path } = this.state
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="name"
                  placeholder="Name"
                  value={name}
                  type="text"
                  error={path}
                  onChange={this.onChange} />
                <TextFieldGroup
                  name="lastname"
                  placeholder="Lastname"
                  value={lastname}
                  type="text"
                  error={path}
                  onChange={this.onChange} />
                <TextFieldGroup
                  name="email"
                  placeholder="Email"
                  value={email}
                  type="email"
                  error={path}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar "
                  onChange={this.onChange} />
                <TextFieldGroup
                  name="password"
                  placeholder="Password"
                  value={password}
                  type="password"
                  error={path}
                  onChange={this.onChange} />
                <TextFieldGroup
                  name="password2"
                  placeholder="Confirm Password"
                  value={password2}
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
  { registerUser },
)(withRouter(Register))
