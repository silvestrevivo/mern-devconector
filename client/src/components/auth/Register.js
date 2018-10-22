import React, { Component } from 'react'
import axios from 'axios'
import className from 'classnames'

class Register extends Component {
  state = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    password2: '',
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
    const { name, lastname, email, password, password2 } = this.state
    axios
      .post('/api/users/register', { name, lastname, email, password, 'Confirm password': password2 })
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
    const { name, lastname, email, password, password2, error, path } = this.state
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={className('form-control form-control-lg', {
                      'is-invalid': path === 'name',
                    })}
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={className('form-control form-control-lg', {
                      'is-invalid': path === 'lastname',
                    })}
                    placeholder="Lastname"
                    name="lastname"
                    value={lastname}
                    onChange={this.onChange}
                  />
                </div>
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
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use a Gravatar email
                  </small>
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
                <div className="form-group">
                  <input
                    type="password"
                    className={className('form-control form-control-lg', {
                      'is-invalid': path === 'Confirm Password',
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2}
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

export default Register
