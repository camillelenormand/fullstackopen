const notification = ({ message, color }) => {
  const style = {
    color: color,
    background: 'white',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontWeight: 'bold'
  }

  return (
    !!message ?
      <div style={style}>{message}</div>
    :
      null
    )
}
  

export default notification