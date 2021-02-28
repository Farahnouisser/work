
import axios from 'axios'
import {
  FETCH_MENU_REQUEST,
  FETCH_MENU_SUCCESS,
  FETCH_MENU_FAILURE
} from './sidebarTypes'

export const fetchMenu = () => {
  return (dispatch) => {
    dispatch(fetchMenuRequest())
    axios
      .get('https://api.mocki.io/v1/b1233ced')
      .then(response => {
        // response.data is the users
        const items = response.data
        dispatch(fetchMenuSuccess(items))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchMenuFailure(error.message))
      })
  }
}

export const fetchMenuRequest = () => {
  return {
    type: FETCH_MENU_REQUEST
  }
}

export const fetchMenuSuccess = items => {
  return {
    type: FETCH_MENU_SUCCESS,
    payload: items
  }
}

export const fetchMenuFailure = error => {
  return {
    type: FETCH_MENU_FAILURE,
    payload: error
  }
}