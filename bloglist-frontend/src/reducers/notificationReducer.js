const initialState = { success: true, message: null }

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    default:
      return state
  }
}

const notificationChange = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    payload: notification,
  }
}

export const setNotification = (notification) => {
  return (dispatch) => {
    dispatch(notificationChange(notification))
    setTimeout(() => {
      dispatch(notificationChange(initialState))
    }, 5000)
  }
}

export default notificationReducer
