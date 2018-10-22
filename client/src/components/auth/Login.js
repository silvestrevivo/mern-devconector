import React, { Component } from 'react'
import axios from 'axios'
import className from 'classnames'

class Login extends Component {
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
    const { email, password } = this.state
    const user = { email, password }
    axios
      .post('/api/users/login', user)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err.response.data)
        this.setState({
          error: err.response.data.message,
          path: err.response.data.path,
        })
      })
  }

  render() {
    const { email, password, error, path } = this.state
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

export default Login
