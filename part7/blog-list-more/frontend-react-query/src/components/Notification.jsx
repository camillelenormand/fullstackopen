import { useNotificationValue } from "../hooks/useNotificationValue"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  const notification = useNotificationValue()

  if (!notification) {
    return null
  }

  return <div className={style}>{notification}</div>
}

export default Notification
