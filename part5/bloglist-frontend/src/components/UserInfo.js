const UserInfo = ({ user }) => {
  return (
    <div>
      <h5>UserInfo</h5>
      <ul>
        <li>Username: {user.username}</li>
        <li>Name: {user.name}</li>
      </ul>
      <hr />
    </div>
  )
}

export default UserInfo