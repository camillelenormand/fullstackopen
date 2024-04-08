import UserList from "../components/UserList";

const UserPage = () => {

  if (!user) {
    return null;
  }

  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <UserList />
    </>
  )
}

export default UserPage
