import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notif = useSelector((state) => state.notification)

  if (!notif.success) {
    return <Alert variant="danger">{notif.message}</Alert>
  }

  if (notif.message === null) {
    return null
  }

  return <Alert variant="success">{notif.message}</Alert>
}

export default Notification
