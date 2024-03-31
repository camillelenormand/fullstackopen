import BlogList from './BlogList'
import BlogForm from './BlogForm'
import LogoutButton from './LogOutButton'

function HomePage() {

    return (
      <div>
        <BlogForm />
        <BlogList />
        <LogoutButton />
      </div>
    )
  }

export default HomePage