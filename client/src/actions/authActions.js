import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

import { GET_ERRORS } from './types'
import { SET_CURRENT_USER } from './types'
import { CLEAN_REGISTER_ERRORS } from './types'

// Register User
export function registerUser(userData, history) {
  return dispatch => {
    axios
      .post('/api/users/register', userData)
      .then(response => {
        history.push('/login')
        dispatch({
          type: CLEAN_REGISTER_ERRORS,
          payload: {}
        })
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      })
  }
}

// Login User
export function loginUser(userData) {
  return dispatch => {
    axios
      .post('/api/users/login', userData)
      .then(response => {
        // Save token to localStorage
        const { token } = response.data
        localStorage.setItem('jwtToken', token)
        // Set token to auth header
        setAuthToken(token)
        // Decode token
        const decoded = jwt_decode(token)
        // Set current user
        dispatch(setCurrentUser(decoded))
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      })
  }
}

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  }
}

// User logout
export function logoutUser() {
  return dispatch => {
    // Remove token from localstorage
    localStorage.removeItem('jwtToken')
    // Remove Auth header for future requests
    setAuthToken(false)
    // Set current user to {} which will set isAuth to false
    dispatch(setCurrentUser({}))
  }
}
