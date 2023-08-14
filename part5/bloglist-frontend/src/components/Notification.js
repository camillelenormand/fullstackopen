const notification = ({ message, color }) => {
  const style = {
    color: color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div className={style}>
      {message}
    </div>
  )}
  

export default notification