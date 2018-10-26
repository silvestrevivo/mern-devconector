import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS } from 'types';

export function getCurrentProfile() {
  return dispatch => {
    axios
      .get('')
      .then(response => {
        dispatch({
          type: PROFILE_LOADING,
          payload: response
        })
        dispatch({
          type: GET_PROFILE,
          payload: response
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

